import React from "react";
import { Line } from "react-chartjs-2";
import { RunnerItemType } from "../../api/api";

type PropsType = {
  lastSevenDaySessions: RunnerItemType[]
}
type AllDataType = {
  day: string;
  date: string;
  range: number;
}

function customToolTip(tooltipModel: any) {
  let tooltipEl = document.getElementById("chartjs-tooltip");

  if (!tooltipEl) {
    tooltipEl = document.createElement("div");
    tooltipEl.id = "chartjs-tooltip";
    tooltipEl.innerHTML = '<div class="custom-tooltip"></div>';
    document.body.appendChild(tooltipEl);
  }

  if (tooltipModel.opacity === 0) {
    tooltipEl.style.opacity = "0";
    return;
  }

  tooltipEl.classList.remove("above", "below", "no-transform");
  if (tooltipModel.yAlign) {
    tooltipEl.classList.add(tooltipModel.yAlign);
  } else {
    tooltipEl.classList.add("no-transform");
  }

  if (tooltipModel.body) {
    const data = tooltipModel.title[0].split(",");

    const innerHtml = `
      <div class="custom-tooltip__day">${data[1]}</div>
      <div class="custom-tooltip__date">${data[0]}</div>
      <div class="custom-tooltip__distance">${tooltipModel.dataPoints[0].value}м.</div>
      `;

    let tooltipRoot = tooltipEl.querySelector(".custom-tooltip");
    if (tooltipRoot) tooltipRoot.innerHTML = innerHtml;
  }
  //@ts-ignore
  let position = this._chart.canvas.getBoundingClientRect();

  tooltipEl.style.opacity = "1";
  tooltipEl.style.position = "absolute";
  tooltipEl.style.left =
    position.left + window.pageXOffset + tooltipModel.caretX + "px";
  tooltipEl.style.top =
    position.top + window.pageYOffset + tooltipModel.caretY + "px";
  tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
  tooltipEl.style.fontSize = tooltipModel.bodyFontSize + "px";
  tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
  tooltipEl.style.padding =
    tooltipModel.yPadding + "px " + tooltipModel.xPadding + "px";
  tooltipEl.style.pointerEvents = "none";
}

const ChartLine: React.FC<PropsType> = ({lastSevenDaySessions}) => {
  let allData: AllDataType[] = new Array(7)
  allData.fill({date: "", day: "", range: 0})
  let now = new Date()
  let days = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
  
  allData = allData.map(el => {
    const find = lastSevenDaySessions.filter(el => new Date(el.date).toLocaleDateString() === now.toLocaleDateString())
    let range = 0
    find.forEach(el => {
      range += el.distance
    })
    let obj = {
      day: days[now.getDay()],
      date: now.toLocaleDateString(),
      range
    }
    now.setDate(now.getDate() - 1)
    return obj
  })
  allData.reverse()

  
  const data = {
    labels: allData.map(el => [el.date, el.day]),
    datasets: [
      {
        data: allData.map(el => el.range),
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgba(236, 23, 79, 1)",
        borderWidth: 3,
        pointBorderWidth: 10,
        pointBackgroundColor: "rgba(236, 23, 79, 1)",
        lineTension: 0,
        pointHoverBorderWidth: 15,
        pointHoverBackgroundColor: "rgba(236, 23, 79, 1)",
      },
    ],
  };
  const option = {
    tooltips: {
      enabled: false,
      custom: customToolTip,
    },
    legend: {
      display: false,
    },
    hover: {
      animationDuration: 0,
    },
    scales: {
      yAxes: [{
        display: true,
        ticks: {
          suggestedMin: 0,
          suggestedMax: [...allData.map(el => el.range)].sort((a, b) => b - a)[0] + 5000,
        }
      }]
    },
    animation: {
      onComplete: function () {
        // @ts-ignore
        let chartInstance = this.chart,
        ctx = chartInstance.ctx;

        ctx.textAlign = "center";
        ctx.font = '20px "Helvetica Neue", Helvetica, Arial, sans-serif';
        ctx.textBaseline = "bottom";

        // @ts-ignore
        this.data.datasets.forEach(function (dataset: any, i: any) {
          let meta = chartInstance.controller.getDatasetMeta(i);
          meta.data.forEach(function (bar: any, index: any) {
            let data = dataset.data[index];
            ctx.fillText(`${data}м.`, bar._model.x, bar._model.y - 15);
          });
        });
      },
    },
  };

  return (
    <>
      <Line data={data} options={option} />
    </>
  );
};

export default ChartLine;
