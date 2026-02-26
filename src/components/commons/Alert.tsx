import { AlertCircle } from 'lucide-react'

interface CrmAlert {
    msg: React.ReactNode
}

function CrmAlert({msg}: CrmAlert) {
  return (
    <div className="flex border-l-[4px] border-[var(--yellow)] rounded-xl p-2 items-center gap-2 text-[var(--yellow)] bg-yellow-500/10">
        <AlertCircle/>
        <div>
            <h4 className="text-sm">{msg}</h4>
        </div>
    </div>
  )
}

export default CrmAlert