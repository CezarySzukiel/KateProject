import React, {useState, useEffect, useRef} from 'react';
import {
    LineChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    Line,
    Brush,
    ReferenceDot,
    ReferenceLine
} from "recharts"


const generateLinearData = (m, b, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        const y = m * x + b + yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generateQuadraticData = (a, b, c, xStart, xEnd, xStep, xOffset, yStep, yOffset) => {
    const data = [];
    console.log('step', xStep, yStep)
    xStep = xStep - 1
    for (let x = xStart - 1; x <= xEnd - 1; x += xStep) {
        const y = a * x * x + b * x + c + yOffset;
        x = x + xOffset
        data.push({x, y});
    }
    return data;
};

const generateInverseData = (k, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        const y = k / x + yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generateSinusoidalData = (amplitude, frequency, phase, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        const y = amplitude * Math.sin(frequency * x + phase) + yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generateLogarithmicData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        const y = Math.log(x) / Math.log(a) + yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generateExponentialData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        const y = Math.pow(a, x) + yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generateSquareRootData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        const y = Math.sqrt(x) * a + yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generatePolynomialData = (coefficients, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        let y = 0;
        coefficients.forEach((coefficient, index) => {
            y += coefficient * Math.pow(x, coefficients.length - 1 - index);
        });
        y += yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generateStepData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
    const data = [];
    for (let x = xStart; x <= xEnd; x += xStep) {
        const y = Math.floor(x) * a + yOffset;
        data.push({x: x + xOffset, y});
    }
    return data;
};

const generateYPoints = (yStart, yEnd, yStep, yOffset) => {
    const yPoints = [];
    for (let y = yStart - yStep; y <= yEnd + yStep; y += yStep) {
        yPoints.push(y);
    }
    return yPoints;
}

export const Chart = (props) => {
    const {
        description,
        a,
        b,
        c,
        coefficients,
        function_type,
        x_end,
        x_start,
        x_step,
        x_offset,
        y_start,
        y_end,
        y_step,
        y_offset,
        legend,
    } = props.data
    const [data, setData] = useState(null)
    const [lineType, setLineType] = useState('natural')
    const [xStart, setXStart] = useState(x_start)
    const [xEnd, setXEnd] = useState(x_end)
    const [xTicks, setXTicks] = useState([])
    const [yTicks, setYTicks] = useState([])


    useEffect(() => {
        if (data) {
            console.log('data', data)
            const xTicks_ = data.map((item) => item.x)
            xTicks_.push(xStart - x_step)
            xTicks_.push(xEnd + x_step)
            xTicks_.sort((a, b) => a - b)
            setXTicks(xTicks_)
            setYTicks(generateYPoints(y_start, y_end, y_step, y_offset))
            console.log('xticks', xTicks_)
            console.log('yticks', generateYPoints(y_start, y_end, y_step, y_offset))
        }
    }, [data]);


    useEffect(() => {
        switch (function_type) {
            case 'linear':
                setData(generateLinearData(a, b, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('natural')
                break;
            case 'quadratic':
                setData(generateQuadraticData(a, b, c, x_start, x_end, x_step, x_offset, y_step, y_offset));
                setLineType('natural')
                break;
            case 'inverse':
                setData(generateInverseData(a, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('natural')
                break;
            case 'sinusoidal':
                setData(generateSinusoidalData(a, b, c, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('natural')
                break;
            case 'logarithmic':
                setData(generateLogarithmicData(a, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('natural')
                break;
            case 'exponential':
                setData(generateExponentialData(a, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('natural')
                break;
            case 'square_root':
                setData(generateSquareRootData(a, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('natural')
                break;
            case 'polynomial':
                setData(generatePolynomialData(coefficients, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('natural')
                break;
            case 'step':
                setData(generateStepData(a, x_start, x_end, x_step, x_offset, y_offset));
                setLineType('step')
                break;
            default:
                break;
        }
    }, [])

    const CustomLegend = () => {
        return <div>{legend}</div>;
    };

    return (
        <div className={'chart'}>
            {description && <p>{description}</p>}
            <LineChart
                width={400}
                height={400}
                data={data}
                margin={{top: 10, right: 0, left: 10, bottom: 0}}
            >
                <CartesianGrid strokeDasharray="1 1"/>
                <XAxis dataKey="x" type={"number"} ticks={xTicks} stroke={'#f0f0f0'} axisLine={true}/>
                <YAxis interval={0} ticks={yTicks} stroke={'#f0f0f0'} orientation={'left'}/>
                <Tooltip
                    formatter={(value, name, props) => [`${value}`, `y`]}
                    labelFormatter={(label) => `x: ${label}`}
                    contentStyle={{backgroundColor: '#868794', border: 'none', color: '#f0f0f0'}}
                    itemStyle={{color: '#f0f0f0'}}
                />
                <ReferenceLine x={0} stroke="#f0f0f0" strokeDasharray="1 0"/>
                <ReferenceLine y={0} stroke="#f0f0f0" strokeDasharray="1 0"/>
                <Legend
                    content={<CustomLegend/>}
                    layout="vertical"
                    verticalAlign="bottom"
                    wrapperStyle={{ bottom: 60, left: 80, lineHeight: '24px' }}
                />
                <Line type={lineType} dataKey="y" stroke="black" dot={false}/>
            </LineChart>
        </div>
    );
}