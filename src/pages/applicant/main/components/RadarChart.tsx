import React from 'react';
import { Svg, Polygon, Text } from 'react-native-svg';

interface RadarChartProps {
  data: number[];
  labels: string[];
}

export const RadarChart: React.FC<RadarChartProps> = ({ data, labels }) => {
  const chartSize = 190; // 차트의 크기
  const padding = 68; // SVG 바깥쪽 여백을 위한 패딩
  const size = chartSize + padding * 2; // 전체 SVG 크기
  const numVertices = 5;
  const angle = (Math.PI * 2) / numVertices; // 각 꼭지점 간의 각도

  // 꼭지점의 좌표 계산
  const points = Array.from({ length: numVertices }, (_, i) => {
    const x = chartSize / 2 + (chartSize / 2) * Math.cos(angle * i - Math.PI / 2);
    const y = chartSize / 2 + (chartSize / 2) * Math.sin(angle * i - Math.PI / 2);
    return { x, y };
  });

  // 데이터 포인트에 따른 차트 좌표 계산
  const chartPoints = data.map((value, i) => {
    const x = chartSize / 2 + (value * chartSize / 2) * Math.cos(angle * i - Math.PI / 2);
    const y = chartSize / 2 + (value * chartSize / 2) * Math.sin(angle * i - Math.PI / 2);
    return `${x + padding},${y + padding}`;
  }).join(' ');

  // 레이블 위치 조정 함수
  const adjustLabelPosition = (point: { x: number, y: number }, index: number) => {
    let dx = 0;
    let dy = 0;
    let anchor: 'start' | 'middle' | 'end' = 'middle';

    switch (index) {
      case 0: // JAVA
        dy = -15;
        break;
      case 1: // Back End
        anchor = 'start';
        dx = 10;
        break;
      case 2: // DB
        anchor = 'start';
        dy = 15;
        break;
      case 3: // C#
        anchor = 'start';
        dy = 15;
        dx = -20;
        break;
      case 4: // Front End
        anchor = 'end';
        dx = -10;
        break;
      default:
        break;
    }

    return {
      x: point.x + padding,
      y: point.y + padding,
      dx: dx,
      dy: dy,
      anchor: anchor
    };
  };

  return (
    <Svg height={size} width={size} viewBox={`0 0 ${size} ${size}`}>
      {/* 바깥쪽 오각형 그리기 */}
      <Polygon
        points={points.map(p => `${p.x + padding},${p.y + padding}`).join(' ')}
        fill="none"
        stroke="#000"
        strokeWidth="1"
      />

      {/* 데이터 레이더 차트 그리기 */}
      <Polygon
        points={chartPoints}
        fill="#007FFF"
        fillOpacity="0.4"
        stroke="#007FFF"
        strokeWidth="2"
      />

      {/* 레이블 표시 */}
      {points.map((point, index) => {
        const adjustedPosition = adjustLabelPosition(point, index);

        return (
          <Text
            key={index}
            x={adjustedPosition.x}
            y={adjustedPosition.y}
            dx={adjustedPosition.dx}
            dy={adjustedPosition.dy}
            fill="black"
            fontSize="12"
            textAnchor={adjustedPosition.anchor}
            alignmentBaseline="middle"
          >
            {labels[index]}
          </Text>
        );
      })}
    </Svg>
  );
};
