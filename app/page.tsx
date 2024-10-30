'use client';
import { useRouter } from 'next/navigation';
import Cell from '@/app/components/Cell';
import { useEffect, useRef, useState, useCallback } from 'react';

const MAP_SIZE = 3;

interface CellModel {
    tickToHide: number;
    visible: boolean;
}

export default function Home() {

    const [ state, setState ] = useState({
        gameInProgress: false,
        timer: 0,
        map: [ ...Array(MAP_SIZE) ].map(() => [ ...Array(MAP_SIZE) ].map(() => ({
            visible: false,
            tickToHide: 0
        } as CellModel))), // Generate game field
        tickIndex: 0,
    });
    const currentTimer = useRef();
    const router = useRouter();

    useEffect(() => {
        return () => clearInterval(currentTimer.current); // Clear interval on destroy
    }, []);

    const startTimer = () => {
        currentTimer.current = window.setInterval(tick, 1000) as any;
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
                    const additionalTickLife = rowIndexRnd === rowIndex && cellIndexRnd === cellIndex ? Math.round(Math.random() * 5) + 3 : 0;
                    const tickToHide = (cell.tickToHide > 0 ? cell.tickToHide - 1 : 0) + additionalTickLife;

                    return {
                        ...cell,
                        visible: tickToHide > 0,
                        tickToHide,
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
        console.log('tick index', state.tickIndex);
        const newMap = getUpdatedMap();
        setState((prevState) => ({
            ...prevState,
            map: [ ...newMap ],
            tickIndex: state.tickIndex + 1,
        }));
    }

    const handleChildClick = (rowIndex: number, cellIndex: number) => {
        const newMap = [...state.map];
        newMap[rowIndex][cellIndex].visible = !newMap[rowIndex][cellIndex].visible;
        setState((prevState) => {
            return {
            ...prevState,
            map: newMap,
            tickIndex: state.tickIndex + 1
            }
        });
        console.log('Клик произошел в дочернем компоненте', state.map[rowIndex][cellIndex].visible);
    };

    const renderCell = (cellData: CellModel, rowIndex: number, cellIndex: number) => {
        return <div key={`${ rowIndex }_${ cellIndex }`}>
            <div>={ cellData.tickToHide }=</div>
            <Cell onHamsterClick={ () => handleChildClick(rowIndex, cellIndex) } className="mb-4" visible={ cellData.visible }/>
        </div>;
    }


    return (
        <div className="m-5">
            <button type="button" className="mb-8 mr-5" onClick={ () => router.push('/dashboard') }>
                Dashboard
            </button>
            <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded"
                    onClick={ startGameClick }> { state.gameInProgress ? 'Reset' : 'Start game' }</button>
            <div className="playground grid grid-cols-4 gap-4">
                { state.map.map((row, rowIndex) => {
                    return <div key={ rowIndex }>
                        { row.map((cell, cellIndex) => renderCell(cell, rowIndex, cellIndex)) }
                    </div>;
                }) }
            </div>
            <div className="debug">
                <span>Game Tick</span><span>{ state.timer }</span>
            </div>
        </div>
    );
}
