import { useEffect, useState } from 'react';

interface CellProps extends React.HTMLAttributes<HTMLDivElement> {
    visible: boolean;
}

const Cell = ({visible = false, className, onHamsterClick }: CellProps) => {

    const [isShow, setIsShow] = useState(visible);

    useEffect(() => {
        setIsShow(visible);
    }, [visible]);

    const handleHamsterClick = () => {
        onHamsterClick(isShow);
    };

    return (
        <div className={className}>
            <div className={`${isShow ? 'show' : ''} image-container bg-gray-500 cursor-crosshair`}
                 onClick={handleHamsterClick}
            >

            </div>
        </div>
    );
}

export default Cell;