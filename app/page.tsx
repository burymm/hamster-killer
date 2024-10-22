'use client';
import { useRouter } from 'next/navigation';
import Cell from '@/app/components/Cell';
import { useEffect, useRef, useState } from 'react';

const MAP_SIZE = 3;

export default function Home() {

    const [state, setState] = useState({
        gameInProgress: false,
        timer: 0,
        map: [ ...Array(MAP_SIZE) ].map(() => [...Array(MAP_SIZE)].map(() => ({visible: false}))) // Generate game field
    });
    const currentTimer = useRef();
    const router = useRouter();

    useEffect(() => {
        return () => clearInterval(currentTimer.current); // Clear interval on destroy
    }, []);

    const startTimer = () => {
        currentTimer.current = window.setInterval(tick, 1000);
    };

    const stopTimer = () => {
        clearInterval(currentTimer.current);
    };

    const getUpdatedMap = () => {
        let rowIndexRnd = Math.abs(Math.round(Math.random() * MAP_SIZE - 1));
        rowIndexRnd = (rowIndexRnd < 0) ? 0 : rowIndexRnd;
        let cellIndexRnd = Math.abs(Math.round(Math.random() * MAP_SIZE - 1));
        cellIndexRnd = cellIndexRnd < 0 ? 0 : cellIndexRnd;
        return state.map.map((row, rowIndex) => {
            return [
                ...row.map((cell, cellIndex) => {
                    return {
                        ...cell,
                        visible: rowIndexRnd === rowIndex && cellIndexRnd === cellIndex ? !cell.visible : cell.visible,
                    }
                }),
            ]
        });
    }

    function startGameClick() {
        setState({
            ...state,
            gameInProgress: !state.gameInProgress,
        });
        if (state.gameInProgress) {
            stopTimer();
        } else {
            startTimer();
        }
    }

    function tick() {
        const newMap = getUpdatedMap();
        setState((prevState) => ({
            ...prevState,
            map: [...newMap]
        }));
    }

    const renderCell = (visible: boolean, key: string) => <Cell className="mb-4" visible={visible} key={key}/>;


    return (
        <div className="m-5">
            <button type="button" className="mb-8 mr-5" onClick={ () => router.push('/dashboard') }>
                Dashboard
            </button>
            <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                    onClick={ startGameClick }> {state.gameInProgress ? 'Reset' : 'Start game'}</button>
            <div className="playground grid grid-cols-4 gap-4">
                { state.map.map((row, rowIndex) => {
                    return <div key={ rowIndex }>
                        { row.map((cell, cellIndex) => renderCell(cell.visible, `${rowIndex}_${cellIndex}`))}
                    </div>;
                }) }
            </div>
            <div className="debug">
                <span>Game Tick</span><span>{ state.timer }</span>
            </div>
        </div>
    );
}
