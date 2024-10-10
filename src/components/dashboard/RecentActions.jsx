import { useEffect, useState } from "react";
import useFetchData from "../../hooks/useFetchData";

const RecentActions = () => {
  const { data: farmsHistory, loading: loadingFarms, error: errorFarms } = useFetchData("/dashboard/action_history/");

  if (farmsHistory) {
    console.log(farmsHistory)
  }
  return (
    <div>
      {farmsHistory.length > 0 &&
        farmsHistory.map((farm, index) => <li key={index}>{farm.name}</li>)}
    </div>
  );
};

export default RecentActions;
