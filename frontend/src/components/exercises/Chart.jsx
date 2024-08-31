import './chart.css'
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
    for (let x_ = xStart; x_ <= xEnd; x_ += xStep) {
        const y = a * x_ * x_ + b * x_ + c + yOffset;
        const x = x_ + xOffset
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

const generateTicks = (data, step, axis) => {
    const ticks = [];
    const start = data.reduce((acc, item) => {
        return item[axis] < acc ? item[axis] : acc
    }, data[0][axis])
    const end = data.reduce((acc, item) => {
        return item[axis] > acc ? item[axis] : acc
    }, data[0][axis])
    for (let i = start - step; i <= end + step; i += step) {
        ticks.push(i);
    }
    return ticks;
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
        y_step,
        y_offset,
        legend,
    } = props.data
    const [data, setData] = useState(null)
    const [lineType, setLineType] = useState('natural')
    const [xTicks, setXTicks] = useState([])
    const [yTicks, setYTicks] = useState([])
    const chartWidth = xTicks.length * 25
    const chartHeight = yTicks.length * 25

    useEffect(() => {
        if (data) {
            setYTicks(generateTicks(data, y_step, 'y'))
            setXTicks(generateTicks(data, x_step, 'x'))

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
                width={chartWidth}
                height={chartHeight}
                data={data}
                margin={{top: 10, right: 0, left: 0, bottom: 0}}
            >
                <CartesianGrid
                    strokeDasharray="1 1"
                />
                <XAxis
                    domain={[0, 0]}
                    dataKey="x"
                    type={"number"}
                    ticks={xTicks}
                    stroke={'#f0f0f0'}
                    axisLine={true}
                    tickCount={Math.ceil((xTicks[xTicks.length - 1] - xTicks[0]) / 2)}
                />
                <YAxis
                    domain={[0, 0]}
                    dataKey="y"
                    type={"number"}
                    interval={0}
                    ticks={yTicks}
                    stroke={'#f0f0f0'}
                    orientation={'left'}
                    tickCount={Math.ceil((yTicks[yTicks.length - 1] - yTicks[0]) / 2)}
                />
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
                    wrapperStyle={{bottom: 60, left: 80, lineHeight: '24px'}}
                />
                <Line type={lineType} dataKey="y" stroke="black" dot={false} strokeWidth={2}/>
            </LineChart>
        </div>
    );
}