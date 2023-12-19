
import { Switch } from '@headlessui/react'
import { Dispatch, SetStateAction } from 'react'

export default function Toggle({enabled,setEnabled}:{enabled:boolean,setEnabled:Dispatch<SetStateAction<boolean>>}) {

return (
    <div className="py-16">
    <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${enabled ? 'bg-purple-600' : 'bg-gray-700'}
            relative inline-flex h-[34px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white/75`}
        >
        <span className="sr-only">Use setting</span>
        <span
            aria-hidden="true"
            className={`${enabled ? 'translate-x-10' : 'translate-x-0'}
            pointer-events-none inline-block h-[30px] w-[30px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
        />
    </Switch>
    </div>
)
}
