import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line, Brush, ReferenceDot, ReferenceLine } from "recharts"

// funkcja kwadratyowa wzór ogólny
const generateQuadraticData = (a, b, c, xStart, xEnd, xStep, xOffset, yOffset) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = a * x * x + b * x + c + yOffset;
    x = x + xOffset
    data.push({ x, y });
  }
  return data;
};

const generateSinusoidalData = (amplitude, frequency, phase, xStart, xEnd, xStep) => {
  const data = [];
  for (let x = xStart; x <= xEnd; x += xStep) {
    const y = amplitude * Math.sin(frequency * x + phase);
    data.push({ x, y });
  }
  return data;
};

export const Chart = ({ a, b, c, xStart, xEnd, xStep, xOffset, yOffset }) => {
  const data = generateQuadraticData(a, b, c, xStart, xEnd, xStep, xOffset, yOffset);
  // const data = generateSinusoidalData(9, 1, 0, -10, 10, 0.1);


  return (
    <LineChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="1 6" />
      <XAxis dataKey="x" />
      <YAxis dataKey="x"/>
      <Tooltip />
      {/*<Legend />*/}
      {/*<Brush />*/}
      <ReferenceLine />
      <Line type="natural" dataKey="y" stroke="#8884d8"  dot={false} />
    </LineChart>
  );
}