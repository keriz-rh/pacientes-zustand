
type PatienDetailItemProps = {
    label: string
    data: string
}

function PatienDetailItem({label, data}: PatienDetailItemProps) {
    return (
        <p className="font-bold mb-3 text-gray-700 uppercase">{label}: {''}
            <span className="font-normal normal-case">{data}</span>
        </p>
    );
}

export default PatienDetailItem;