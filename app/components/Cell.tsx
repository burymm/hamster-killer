import { useEffect, useState } from 'react';

interface CellProps {
    visible: boolean;
}

const Cell = ({visible = false}: CellProps) => {

    const [isShow, setIsShow] = useState(visible);

    useEffect(() => {
        setIsShow(visible);
    }, [visible])

    function handleClick() {
        setIsShow(!isShow)
    }

    return (
        <div onClick={handleClick}>
            <div className={`${isShow ? 'show' : ''} image-container`}>

            </div>
            Cell={isShow?.toString()}=
        </div>
    );
}

export default Cell;