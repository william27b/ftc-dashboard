import { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import BaseView, {
  BaseViewHeading,
  BaseViewProps,
  BaseViewHeadingProps,
} from '@/components/views/BaseView';

import { RootState } from '@/store/reducers';

import '@/components/views/DataView/Data.css';

import { Colors, DataItem } from '@/store/types/data';

import { startSocketWatcher } from '@/store/middleware/socketMiddleware';

function DataView(props: BaseViewProps & BaseViewHeadingProps) {
  const data = useSelector((state: RootState) => state.data);

  const dispatch = useDispatch();

  useEffect(() => {
    startSocketWatcher(dispatch);
  }, [dispatch]);

  let [dashTop, setDashTop] = useState(0.0);

  useEffect(() => {
    let update = () => {
      let dataDiv = document.getElementById('dataDiv');

      if (!dataDiv) return;

      setDashTop(dataDiv.offsetTop);
    };

    update();

    window.addEventListener('resize', update);
  });

  let Telemetry = (lines: DataItem[]) => {
    console.log(lines);

    return (
      <div
        style={{
          position: 'absolute',
          top: dashTop + 'px',
          bottom: '0px',
          left: '0px',
          right: '0px',
        }}
      >
        {lines.map((line: DataItem) => (
          <div
            className="bg-gray-200 dark:bg-slate-800"
            style={{
              display: 'inline-block',
              padding: '15px 50px 15px 50px',
              margin: '20px',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: '0.75em',
                paddingBottom: '0.75em',
                fontWeight: 'normal',
              }}
            >
              {line.caption}
            </p>
            {line.type == 'NUMERICAL' || line.type == 'QUALITATIVE' ? (
              <h2
                className={line.color ? Colors[line.color] : ''}
                style={{
                  fontSize: '1.5em',
                  fontWeight: 'normal',
                }}
              >
                {String(line.value) +
                  (line.type == 'NUMERICAL' && line.unit
                    ? ' ' + line.unit
                    : '')}
              </h2>
            ) : line.type == 'QUALITATIVE_SELECTION' ? (
              line.options == undefined ? (
                <input
                  type="text"
                  className={
                    (line.color ? Colors[line.color] + ' ' : '') +
                    'rounded bg-gray-200 dark:bg-slate-800'
                  }
                  id={line.id.toString()}
                  defaultValue={String(line.value)}
                  style={{
                    fontWeight: 'normal',
                  }}
                  onChange={(e) => {
                    line.value = e.target.value;
                    dispatch({
                      type: 'SET_DATA',
                      data: data,
                    });
                  }}
                />
              ) : (
                <select
                  className={
                    (line.color ? Colors[line.color] + ' ' : '') +
                    'rounded bg-gray-200 dark:bg-slate-800'
                  }
                  defaultValue={String(line.value)}
                  style={{
                    fontWeight: 'normal',
                  }}
                  id={line.id.toString()}
                  onChange={(e) => {
                    line.value = e.target.value;
                    dispatch({
                      type: 'SET_DATA',
                      data: data,
                    });
                  }}
                >
                  {line.options.map((key) => (
                    <option key={key.toString()} value={key.toString()}>
                      {key}
                    </option>
                  ))}
                </select>
              )
            ) : line.type == 'NUMERICAL_SELECTION' ? (
              <div className="flex">
                <input
                  type="number"
                  id={line.id.toString()}
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                  defaultValue={line.value.toString()}
                  onChange={(e) => {
                    if (
                      line.min != undefined &&
                      Number(e.target.value) < Number(line.min)
                    )
                      e.target.value = line.min.toString();

                    if (
                      line.max != undefined &&
                      Number(e.target.value) > Number(line.max)
                    )
                      e.target.value = line.max.toString();

                    line.value = Number(e.target.value);
                    dispatch({
                      type: 'SET_DATA',
                      data: data,
                    });
                  }}
                />
                <h2
                  className={line.color ? Colors[line.color] : ''}
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 'normal',
                    marginLeft: '0.5em',
                  }}
                >
                  {line.unit}
                </h2>
              </div>
            ) : (
              <div className="flex">
                <input
                  type="range"
                  id={line.id.toString()}
                  defaultValue={(
                    Number(line.value) - Number(line.min)
                  ).toString()}
                  onChange={(e) => {
                    let value = Number(e.target.value) / 100;

                    value =
                      value * (Number(line.max) - Number(line.min)) +
                      Number(line.min);

                    line.value = value;
                    console.log(value);

                    dispatch({
                      type: 'SET_DATA',
                      data: data,
                    });

                    let h2 = document.getElementById(line.id.toString() + 'h2');

                    if (!h2 || !(h2 as HTMLElement)) return;

                    (h2 as HTMLElement).textContent =
                      (Math.round(Number(line.value) * 100) / 100).toString() +
                      ' ' +
                      (line.unit ? line.unit : '');
                  }}
                />
                <h2
                  className={line.color ? Colors[line.color] : ''}
                  id={line.id.toString() + 'h2'}
                  style={{
                    fontSize: '1.5em',
                    fontWeight: 'normal',
                    marginLeft: '10px',
                  }}
                >
                  {(Math.round(Number(line.value) * 100) / 100).toString() +
                    ' ' +
                    (line.unit ? line.unit : '')}
                </h2>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  let Content = (data: DataItem[]) => {
    return Telemetry(data);
  };

  return (
    <BaseView
      className="flex flex-col overflow-auto"
      isUnlocked={props.isUnlocked}
      tabIndex={0}
    >
      <BaseViewHeading isDraggable={props.isDraggable}>Data</BaseViewHeading>
      <div
        className="flex"
        id="dataDiv"
        style={{
          height: '100%',
        }}
      >
        {Content(data)}
      </div>
    </BaseView>
  );
}

export default DataView;
