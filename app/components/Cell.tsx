import { useEffect, useState } from 'react';

interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean;
}

const Cell = ({visible = false, className}: CellProps) => {

    const [isShow, setIsShow] = useState(visible);

    useEffect(() => {
        setIsShow(visible);
    }, [visible])

    function handleClick() {
        setIsShow(!isShow)
    }

    return (
        <div className={className} onClick={handleClick}>
            <div className={`${isShow ? 'show' : ''} image-container bg-gray-500 hover:bg-gray-300 cursor-crosshair`}>

            </div>
        </div>
    );
}

export default Cell;