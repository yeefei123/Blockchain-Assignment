import {
	ActivityIndicator,
	Image,
	Pressable,
	StyleSheet
} from "react-native";

import { ParallaxScrollView } from "@/components/ParallaxScrollView";
import { ThemedButton } from "@/components/ThemedButton";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { chain, client } from "@/constants/thirdweb";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
	useActiveAccount,
	useActiveWallet,
	useAutoConnect,
	useConnect,
	useConnectedWallets,
	useDisconnect,
	useSetActiveWallet,
	useWalletBalance,
} from "thirdweb/react";
import { shortenAddress } from "thirdweb/utils";
import {
	Wallet,
	createWallet,
	getWalletInfo
} from "thirdweb/wallets";
import {
	getUserEmail,
	inAppWallet
} from "thirdweb/wallets/in-app";

const wallets = [
	inAppWallet({
		smartAccount: {
			chain,
			sponsorGas: true,
		},
	}),
	createWallet("io.metamask")
];
const externalWallets = wallets.slice(1);

//Display the wallet selection
export default function HomeScreen() {
	return (
		<ParallaxScrollView
			headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
			headerImage={
				<Image
					source={require("@/assets/images/title.png")}
					style={styles.reactLogo}
				/>
			}
		>
			<ThemedView style={styles.titleContainer}>
				<ThemedText type="title">Connecting Wallets</ThemedText>
			</ThemedView>
			<ConnectSection />
		</ParallaxScrollView>
	);
}

//Connect to wallet
function ConnectSection() {
	const wallet = useActiveWallet();
	const autoConnect = useAutoConnect({
		client,
		wallets,
	});
	const autoConnecting = autoConnect.isLoading;

	//Loading
	if (autoConnecting) {
		return (
			<ThemedView style={{ padding: 24 }}>
				<ActivityIndicator />
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.stepContainer}>
			{wallet ? (
				<>
					<ConnectedSection />
				</>
			) : (
				<ThemedView style={{ gap: 16 }}>
					<ThemedView style={{ height: 12 }} />
					<ThemedView style={styles.rowContainer}>
						{externalWallets.map((w) => (
							<ConnectExternalWallet key={w.id} {...w} />
						))}
					</ThemedView>
				</ThemedView>
			)}
		</ThemedView>
	);
}

//Connect to metamask
function ConnectExternalWallet(wallet: Wallet) {
	const { connect, isConnecting, error } = useConnect();
	const [walletName, setWalletName] = useState<string | null>(null);
	const [walletImage, setWalletImage] = useState<string | null>(null);

	useEffect(() => {
		const fetchWalletName = async () => {
			const [name, image] = await Promise.all([
				getWalletInfo(wallet.id).then((info) => info.name),
				getWalletInfo(wallet.id, true),
			]);
			setWalletName(name);
			setWalletImage(image);
		};
		fetchWalletName();
	}, [wallet]);

	const connectExternalWallet = async () => {
		await connect(async () => {
			await wallet.connect({
				client,
			});
			return wallet;
		});
	};

	return (
		walletImage &&
		walletName && (
			<ThemedView
				style={{
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{isConnecting && !error ? (
					<ActivityIndicator style={{ width: 60, height: 60 }} />
				) : (
					<>
						<Pressable onPress={connectExternalWallet} disabled={isConnecting}>
							<Image
								source={{ uri: walletImage ?? "" }}
								style={{ width: 60, height: 60, borderRadius: 6 }}
							/>
						</Pressable>
						<ThemedText style={{ fontSize: 11 }} type="defaultSemiBold">
							{walletName.split(" ")[0]}
						</ThemedText>
					</>
				)}
			</ThemedView>
		)
	);
}

//After connect with wallet successfully, will display account info and disconnect buttons
function ConnectedSection() {
	const { disconnect } = useDisconnect();
	const account = useActiveAccount();
	const activeWallet = useActiveWallet();
	const setActive = useSetActiveWallet();
	const connectedWallets = useConnectedWallets();
	const balanceQuery = useWalletBalance({
		address: account?.address,
		chain: activeWallet?.getChain(),
		client,
	});
	const navigation = useNavigation();
	const [email, setEmail] = useState("");
	useEffect(() => {
		const fetchEmail = async () => {
			if (activeWallet?.id === "inApp") {
				try {
					const email = await getUserEmail({
						client,
					});
					if (email) {
						setEmail(email);
					}
				} catch (e) {
					// no email
				}
			} else {
				setEmail("");
			}
		};
		fetchEmail();
	}, [account]);

	const switchWallet = async () => {
		const activeIndex = connectedWallets.findIndex(
			(w) => w.id === activeWallet?.id,
		);
		const nextWallet =
			connectedWallets[(activeIndex + 1) % connectedWallets.length];
		if (nextWallet) {
			await setActive(nextWallet);
		}
	};

	return (
		<>
			{account ? (
				<>
					<ThemedText>Connected Wallets: </ThemedText>
					<ThemedView style={{ gap: 2 }}>
						{connectedWallets.map((w, i) => (
							<ThemedText key={w.id + i} type="defaultSemiBold">
								- {w.id} {w.id === activeWallet?.id ? "✅" : ""}
							</ThemedText>
						))}
					</ThemedView>
					<ThemedView style={{ height: 12 }} />
					{email && activeWallet?.id === "inApp" && (
						<ThemedText>
							Email: <ThemedText type="defaultSemiBold">{email}</ThemedText>
						</ThemedText>
					)}
					<ThemedText>
						Address:{" "}
						<ThemedText type="defaultSemiBold">
							{shortenAddress(account.address)}
						</ThemedText>
					</ThemedText>
					<ThemedText>
						Chain:{" "}
						<ThemedText type="defaultSemiBold">
							{activeWallet?.getChain()?.name || "Unknown"}
						</ThemedText>
					</ThemedText>
					<ThemedText>
						Balance:{" "}
						{balanceQuery.data && (
							<ThemedText type="defaultSemiBold">
								{`${balanceQuery.data?.displayValue.slice(0, 8)} ${
									balanceQuery.data?.symbol
								}`}
							</ThemedText>
						)}
					</ThemedText>
					{/* <ThemedView style={{ height: 12 }} />
					{connectedWallets.length > 1 && (
						<ThemedButton
							variant="secondary"
							title="Switch Wallet"
							onPress={switchWallet}
						/>
					)} */}

			{/* navigate to the lobby page */}
					<ThemedButton
						title="Sign message"
						variant="secondary"
						onPress={async () => {
						navigation.navigate('(tabs)/lobby');
						}}
					/>
					<ThemedButton
						title="Disconnect"
						variant="secondary"
						onPress={async () => {
							if (activeWallet) {
								disconnect(activeWallet);
							}
						}}
					/>
					<ThemedView style={{ height: 12 }} />
					<ThemedText type="defaultSemiBold">Connect another wallet</ThemedText>
					<ThemedView style={styles.rowContainer}>
						{externalWallets
							.filter(
								(w) => !connectedWallets.map((cw) => cw.id).includes(w.id),
							)
							.map((w, i) => (
								<ConnectExternalWallet key={w.id + i} {...w} />
							))}
					</ThemedView>
				</>
			) : (
				<>
					<ThemedText>Connect to mint an NFT.</ThemedText>
				</>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	titleContainer: {
		flexDirection: "row",
		alignItems: "center",
		textAlign: "center",
		gap: 8,
	},
	stepContainer: {
		gap: 8,
		marginBottom: 8,
	},
	reactLogo: {
		height: "100%",
		width: "100%",
		bottom: 0,
		left: 0,
		position: "absolute",
	},
	rowContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 24,
		justifyContent: "space-evenly",
	},
});

function getSocialIcon(strategy: string) {
	switch (strategy) {
		case "google":
			return require("@/assets/images/google.png");
		case "facebook":
			return require("@/assets/images/facebook.png");
		case "apple":
			return require("@/assets/images/apple.png");
	}
}
