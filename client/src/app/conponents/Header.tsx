import { Connect } from './Connect'

export function Header() {
    return (
        <header className='navbar flex justify-between p-4 pt-5'>
            <div className='flex gap-2'>
                <Connect />
            </div>
        </header>
    )
}