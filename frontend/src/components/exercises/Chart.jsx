import React, { useState, useEffect, useRef } from 'react';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Brush, ReferenceDot, ReferenceLine } from "recharts"


const generateLinearData = (m, b, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = m * x + b + yOffset;
    data.push({ x: x + xOffset, y });
  }
  return data;
};

const generateQuadraticData = (a, b, c, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = a * x * x + b * x + c + yOffset;
    x = x + xOffset
    data.push({ x, y });
  }
  return data;
};

const generateInverseData = (k, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = k / x + yOffset;
    data.push({ x: x + xOffset, y });
  }
  return data;
};

const generateSinusoidalData = (amplitude, frequency, phase, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = amplitude * Math.sin(frequency * x + phase) + yOffset;
    data.push({ x: x + xOffset, y });
  }
  return data;
};

const generateLogarithmicData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = Math.log(x) / Math.log(a) + yOffset;
    data.push({ x: x + xOffset, y });
  }
  console.log('Logarythmic data: ', data)
  return data;
};

const generateExponentialData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = Math.pow(a, x) + yOffset;
    data.push({ x: x + xOffset, y });
  }
  return data;
};

const generateSquareRootData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = Math.sqrt(x) * a + yOffset;
    data.push({ x: x + xOffset, y });
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
    data.push({ x: x + xOffset, y });
  }
  return data;
};

const generateStepData = (a, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = Math.floor(x) * a + yOffset;
    data.push({ x: x + xOffset, y });
  }
  return data;
};

export const Chart = (props) => {
  const {a, b, c, coefficients, function_type, x_end, x_offset, x_start, x_step, y_offset } = props.data
  const [data, setData] = useState(null)
  const [lineType, setLineType] = useState('natural')

  useEffect(() => {
    switch (function_type) {
      case 'linear':
        setData(generateLinearData(a, b, x_start, x_end, x_step, x_offset, y_offset));
        setLineType('natural')
        break;
      case 'quadratic':
        setData(generateQuadraticData(a, b, c, x_start, x_end, x_step, x_offset, y_offset));
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
      case 'square Root':
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


  return (
    <LineChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="1 6" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <ReferenceLine />
      <Line type={lineType} dataKey="y" stroke="#8884d8"  dot={false} />
    </LineChart>
  );
}