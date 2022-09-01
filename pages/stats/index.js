import { useEffect, useState } from "react";
import { Pie } from "@ant-design/plots";
import apiFetcher from "../../helpers/utilityFunctions";
const TaskProgressStats = ({ statistics }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (Array.isArray(statistics) && statistics.length > 0) {
      setData(statistics);
    }
  }, [statistics]);

  const config = {
    appendPadding: 10,
    data,
    angleField: "totalMinutes",
    colorField: "projectName",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {percentage}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};
export async function getServerSideProps({ req }) {
  const result = await apiFetcher({
    url: `${process.env.API_DOMAIN_URL}/other/taskProgress/getTaskProgressStats`,
    method: `GET`,
    headers: { Cookie: req.headers.cookie },
  });
  console.log(result);
  if (result.status) return { props: { statistics: result.data } };
  else return { props: { statistics: [] } };
}
export default TaskProgressStats;
