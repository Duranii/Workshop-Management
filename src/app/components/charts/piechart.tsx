import React from 'react';
import Chart from 'react-apexcharts';

type ApexFormatterParam = {
  globals: {
    seriesTotals: number[];
  };
};

type PieChartProps = {
  data: number[];
  labels: string[];
};

const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const options: ApexCharts.ApexOptions = {
    chart: {
      type: 'donut',
      height: 290,
    },
    labels: labels,
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 200
        },
        legend: {
          position: 'bottom'
        }
      }
    }],
    plotOptions: {
      pie: {
        donut: {
          size: '60%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '22px',
            },
            value: {
              show: true,
              fontSize: '16px',
              formatter: (val) => `${val}`,
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total',
              formatter: function (w: ApexFormatterParam) {
                return w.globals.seriesTotals.reduce((a, b) => a + b, 0).toString();
              }              
            }
          }
        },
        expandOnClick: true,
      },
    },
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    legend: {
      position: 'bottom',
      offsetY: 0,
    },
    dataLabels: {
      enabled: false,
      formatter: function (val, opts) {
        return opts.w.globals.labels[opts.seriesIndex] + ": " + val;
      }
    },
  };

  return (
    <div className="bg-white p-4 w-[100%] inline-flex flex-col">
      <Chart options={options} series={data} type="donut" height={290} />
    </div>
  );
};

export default PieChart;
