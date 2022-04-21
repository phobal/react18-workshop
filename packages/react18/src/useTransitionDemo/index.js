import React, { useState, useTransition, useDeferredValue } from "react";
import ExpensiveView from "./ExpensiveView";

function UseTransitionDemo() {
  const [value, setValue] = useState(0);
  const [isStartTransition, setIsStartTransition] = useState(false);
  const [renderValue, setRenderValue] = useState(0);

  const [isPending, startTransition] = useTransition();
  // const renderValue = useDeferredValue(value / 1)
  const atRangeChange = React.useCallback(
    (e) => {
      setValue(e.target.value);
      if (isStartTransition) {
        startTransition(() => {
          setRenderValue(e.target.value / 1);
        });
      } else {
        setRenderValue(e.target.value / 1);
      }
    },
    [isStartTransition, startTransition]
  );

  return (
    <div className="App">
      <div className="app-content">
        <label>
          <input
            type="checkbox"
            checked={isStartTransition}
            onChange={(e) => {
              setIsStartTransition(e.target.checked);
            }}
          />
          useTransition
        </label>
        <h3>
          input:{value} {isPending ? " Loading..." : null}
        </h3>
        <input
          type="range"
          min="0"
          max="600"
          step="1"
          value={value}
          onChange={atRangeChange}
        />
        <hr />
        <ExpensiveView count={renderValue} />
      </div>
    </div>
  );
}

export default UseTransitionDemo;
