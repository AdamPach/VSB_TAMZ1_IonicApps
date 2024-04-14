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

    const fetchGraphData = async (): Promise<number[]> => {
        const currDate = new Date();
        const data: number[] = [];

        for(let i = 0; i < 10; i++)
        {
            const date = new Date();
            date.setDate(currDate.getDate() - 30 * i);

            const response = await fetch(`http://linedu.vsb.cz/~mor03/TAMZ/cnb_json.php?lang=en&date=${date.toISOString().split('T')[0]}`);

            if(response.ok)
            {
                const responseJson = await response.json();

                const currency = responseJson.data.find((currency: Currency) => currency.code === selectedCurrency.code);

                if(currency !== undefined)
                {
                    data.push(currency.rate * currency.unit);
                }
            }
        }

        data.reverse();
        return data;
    }

    useEffect(() => {
        if(canvasRef.current !== null)
        {

            fetchGraphData()
                .then(points => {

                    const pointMin = Math.floor(Math.min(...points));
                    const pointMax = Math.ceil(Math.max(...points));

                    const canvas = canvasRef.current;
                    const ctx = canvas?.getContext('2d');

                    if(ctx !== null)
                    {

                        ctx!.clearRect(0, 0, canvasWidth, canvasHeight);

                        points.forEach((point, index) => {
                            const x = 10 + (index * ((canvasWidth - 20) / (points.length - 1)));
                            const y = 300 - ((point - pointMin)*(canvasHeight / (pointMax - pointMin)));

                            if(index > 0)
                            {
                                ctx!.lineTo(x, y);
                                ctx!.stroke();
                                ctx!.closePath();
                            }

                            ctx!.beginPath();

                            ctx!.arc(x, y, 5, 0, 2 * Math.PI);

                            ctx!.fillText(point.toString(), x - 10, y - 10);

                            ctx!.fill();
                            ctx!.stroke();

                            ctx!.moveTo(x, y);
                        });
                    }
                });
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