import "./GraphView.tsx.css"

import {Currency} from "../models/currenciesModels";
import {useEffect, useRef} from "react";

type GraphViewProps= {
    selectedCurrency: Currency;
}

const GraphView: React.FC<GraphViewProps> = ({selectedCurrency}) => {

    const canvasWidth = 300;
    const canvasHeight = 300;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if(canvasRef.current !== null)
        {
            const points: number[] = [22.69,23.13,23.0,23.84,24.5, 24.17];

            const pointMin = Math.floor(Math.min(...points));
            const pointMax = Math.ceil(Math.max(...points));

            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if(ctx !== null)
            {

                ctx.clearRect(0, 0, canvasWidth, canvasHeight);

                points.forEach((point, index) => {
                    const x = 10 + (index * ((canvasWidth - 20) / (points.length - 1)));
                    // const y = canvasHeight - point * 10;

                    const y = 300 - ((point - pointMin)*(canvasHeight / (pointMax - pointMin)));

                    ctx.beginPath();

                    ctx.arc(x, y, 5, 0, 2 * Math.PI);

                    ctx.fill()

                });
            }
        }
    }, [selectedCurrency]);

    return (
        <div className={"ion-text-center"}>
            <canvas
                ref={canvasRef}
                width={canvasWidth}
                height={canvasHeight}
                className={"graph-border"}>

            </canvas>
        </div>
    );
}

export default GraphView;