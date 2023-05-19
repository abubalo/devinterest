import { useState } from "react";
import Tab from "./Tab";

type Props = {
  tabs: {
    label: string;
    content: string;
  };
};
const Tabs = ({ tabs }: Props) => {
  const [isActive, setIsActive] = useState(false);

  function handleSwitch() {}
  return (
    <div>
      <div>
        {tabs?.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            content={tab.content}
            isActive={isActive}
            onClick={handleSwitch}
          />
        ))}
      </div>
    </div>
  );
};

export default Tabs;
