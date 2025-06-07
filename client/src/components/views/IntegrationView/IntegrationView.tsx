import {
  Component,
  useState,
  useEffect,
  useCallback,
  SetStateAction,
} from 'react';

import { useGamepads } from 'react-gamepads';

import { connect, ConnectedProps, useDispatch, useSelector } from 'react-redux';

import BaseView, {
  BaseViewHeading,
  BaseViewProps,
  BaseViewHeadingProps,
} from '@/components/views/BaseView';

import { RootState } from '@/store/reducers';

import '@/components/views/IntegrationView/Integration.css';
import strafer from '@/components/views/IntegrationView/assets/strafer.png';

import { setMotor, setControl } from '@/store/actions/integration';
import { startSocketWatcher } from '@/store/middleware/socketMiddleware';
import { getIntegrationPreset } from '@/store/actions/settings';
import { IntegrationPreset } from '@/enums/IntegrationType';
import { Values } from '@/typeHelpers';

export default function IntegrationView() {
  const integrationPreset = useSelector(
    (state: RootState) => state.settings.integrationPreset,
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIntegrationPreset());

    startSocketWatcher(dispatch);
  }, [dispatch]);

  let [dashTop, setDashTop] = useState(0.0);

  useEffect(() => {
    let update = () => {
      let integrationDiv = document.getElementById('integrationDiv');

      if (!integrationDiv) return;

      setDashTop(integrationDiv.offsetTop);
    };

    update();

    window.addEventListener('resize', update);
  });

  let Strafer = () => {
    let [wheelPowers, setWheelPowers] = useState([50.0, 50.0, 50.0, 50.0]);
    let [dimensions, setDimensions] = useState(0.0);
    let [controlActive, setControlActive] = useState(false);

    useGamepads((_gamepads) => {
      if (!controlActive) return;

      let gamepads = Object.values(_gamepads);

      for (let i = 0; i < gamepads.length; i++) {
        let gamepad = gamepads[i];
        if (!gamepad) continue;

        let scalePowers = (powers: number[]) => {
          let maxPower = 0.0;

          for (let i = 0; i < 4; i++) {
            if (Math.abs(powers[i]) > maxPower) maxPower = Math.abs(powers[i]);
          }

          if (maxPower < 1) maxPower = 1.0;

          for (let i = 0; i < 4; i++)
            powers[i] = (powers[i] / maxPower + 1) * 50;

          return powers;
        };

        let powers = scalePowers([
          -gamepad.axes[1] - gamepad.axes[0] + gamepad.axes[2],
          -gamepad.axes[1] + gamepad.axes[0] - gamepad.axes[2],
          -gamepad.axes[1] + gamepad.axes[0] + gamepad.axes[2],
          -gamepad.axes[1] - gamepad.axes[0] - gamepad.axes[2],
        ]);

        setWheelPowers(powers);

        let fl = document.getElementById('fl') as HTMLInputElement;
        if (fl) fl.value = powers[0].toString();

        let fr = document.getElementById('fr') as HTMLInputElement;
        if (fr) fr.value = powers[1].toString();

        let bl = document.getElementById('bl') as HTMLInputElement;
        if (bl) bl.value = powers[2].toString();

        let br = document.getElementById('br') as HTMLInputElement;
        if (br) br.value = powers[3].toString();

        dispatch({
          type: 'SET_MOTOR',
          name: localStorage.getItem('frontLeft') || 'frontLeft',
          power: powers[0],
        });

        dispatch({
          type: 'SET_MOTOR',
          name: localStorage.getItem('frontRight') || 'frontRight',
          power: powers[1],
        });

        dispatch({
          type: 'SET_MOTOR',
          name: localStorage.getItem('backLeft') || 'backLeft',
          power: powers[2],
        });

        dispatch({
          type: 'SET_MOTOR',
          name: localStorage.getItem('backRight') || 'backRight',
          power: powers[3],
        });

        break;
      }
    });

    useEffect(() => {
      const update = () => {
        let dash = document.getElementById('strafer');
        if (!dash) return;

        let limitingSize = Math.min(
          // the top is 2 different h2, and the bottom is 1 h2, so 3/2 => 1.5x
          window.innerHeight - 1.5 * dash.offsetTop,
          // 32 is the pixels required for the range
          // dashOffsetTop / 2 is the height of ht
          window.innerWidth - 32 - dash.offsetTop - 40,
        );

        setDimensions(limitingSize);
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);

    return (
      <>
        <img
          src={strafer}
          id="strafer"
          style={{
            transform: 'rotate(90deg)',
            position: 'absolute',
            left: '0px',
            right: '0px',
            height: dimensions + 'px',
            marginLeft: 'auto',
            marginRight: 'auto',
            objectFit: 'contain',
            // backgroundColor: 'black',
          }}
        ></img>
        <div
          style={{
            position: 'relative',
            top: 0.093 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            id="fl"
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              height: dimensions * 0.195 + 'px',
            }}
            disabled={!controlActive}
            onChange={(e) => {
              setWheelPowers([
                Number(e.target.value),
                wheelPowers[1],
                wheelPowers[2],
                wheelPowers[3],
              ]);

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('frontLeft') || 'frontLeft',
                power: Number(e.target.value) / 50 - 1,
              });
            }}
          />
          <p
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[0] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[0] >= 50
              ? String(wheelPowers[0] / 50 - 1).substring(0, 4)
              : String(wheelPowers[0] / 50 - 1).substring(0, 5)}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            top: 0.093 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            id="fr"
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              width: '16px',
              height: dimensions * 0.195 + 'px',
            }}
            disabled={!controlActive}
            onChange={(e) => {
              setWheelPowers([
                wheelPowers[0],
                Number(e.target.value),
                wheelPowers[2],
                wheelPowers[3],
              ]);

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('frontRight') || 'frontRight',
                power: Number(e.target.value) / 50 - 1,
              });
            }}
          />
          <p
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[1] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[1] >= 50
              ? String(wheelPowers[1] / 50 - 1).substring(0, 4)
              : String(wheelPowers[1] / 50 - 1).substring(0, 5)}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            top: 0.707 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            id="bl"
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              height: dimensions * 0.195 + 'px',
            }}
            disabled={!controlActive}
            onChange={(e) => {
              setWheelPowers([
                wheelPowers[0],
                wheelPowers[1],
                Number(e.target.value),
                wheelPowers[3],
              ]);

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('backLeft') || 'backLeft',
                power: Number(e.target.value) / 50 - 1,
              });
            }}
          />
          <p
            style={{
              position: 'absolute',
              left: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[2] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[2] >= 50
              ? String(wheelPowers[2] / 50 - 1).substring(0, 4)
              : String(wheelPowers[2] / 50 - 1).substring(0, 5)}
          </p>
        </div>
        <div
          style={{
            position: 'relative',
            top: 0.707 * dimensions + 'px',
          }}
        >
          <input
            type="range"
            className="vertical"
            id="br"
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              width: '16px',
              height: dimensions * 0.195 + 'px',
            }}
            disabled={!controlActive}
            onChange={(e) => {
              setWheelPowers([
                wheelPowers[0],
                wheelPowers[1],
                wheelPowers[2],
                Number(e.target.value),
              ]);

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('backRight') || 'backRight',
                power: Number(e.target.value) / 50 - 1,
              });
            }}
          />
          <p
            style={{
              position: 'absolute',
              right: 'calc(50% - ' + dimensions * 0.435 + 'px - 16px)',
              top: 'calc(' + dimensions * 0.195 + 'px + 8px)',
              fontWeight: 'lighter',
              color: wheelPowers[3] >= 50 ? '#77DD76' : '#FF6962',
            }}
          >
            {wheelPowers[3] >= 50
              ? String(wheelPowers[3] / 50 - 1).substring(0, 4)
              : String(wheelPowers[3] / 50 - 1).substring(0, 5)}
          </p>
        </div>
        <div
          style={{
            textAlign: 'center',
            height: '100%',
          }}
        >
          <button
            type="button"
            className={
              controlActive
                ? 'me-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                : 'me-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900'
            }
            style={{
              position: 'relative',
              top: 0.15 * dimensions + 'px',
            }}
            onClick={() => {
              setControlActive(!controlActive);
              setControl(!controlActive ? 'web' : 'robot');

              setWheelPowers([50, 50, 50, 50]);

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('frontLeft') || 'frontLeft',
                power: 0.0,
              });

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('frontRight') || 'frontRight',
                power: 0.0,
              });

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('backLeft') || 'backLeft',
                power: 0.0,
              });

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('backRight') || 'backRight',
                power: 0.0,
              });

              let fl = document.getElementById('fl') as HTMLInputElement;
              if (fl) fl.value = '50';

              let fr = document.getElementById('fr') as HTMLInputElement;
              if (fr) fr.value = '50';

              let bl = document.getElementById('bl') as HTMLInputElement;
              if (bl) bl.value = '50';

              let br = document.getElementById('br') as HTMLInputElement;
              if (br) br.value = '50';
            }}
          >
            {controlActive ? 'deactivate' : 'activate'}
          </button>
        </div>
      </>
    );
  };

  let ProgressBar = () => {
    return (
      <div
        className="h-2.5 rounded-full bg-gray-200 dark:bg-gray-700"
        style={{
          margin: '10%',
          width: '80%',
        }}
      >
        <div
          className="h-2.5 rounded-full bg-green-600"
          style={{
            width: '99%',
          }}
        ></div>
      </div>
    );
  };

  let SingleMotor = () => {
    let [power, setPower] = useState(0.0);
    let [controlActive, setControlActive] = useState(false);

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
        <svg
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            height: 'min(100%, 100vw)',
            marginLeft: 'auto',
            marginRight: 'auto',
            position: 'relative',
            top: 'calc((100% - min(100%, 100vw)) * 0.5)',
          }}
        >
          <circle r="25" cx="50" cy="50" className="fill-primary-600" />
          <rect
            width="50"
            height="10"
            x="5"
            y="45"
            rx="2"
            ry="2"
            className="fill-primary-600"
            style={{
              animation:
                power == 0
                  ? ''
                  : (power > 0 ? 'spinForward' : 'spinReverse') +
                    ' ' +
                    1 / Math.abs(power) +
                    's linear infinite',
            }}
          />
          <rect
            width="15"
            height="30"
            x="5"
            y="35"
            rx="4"
            ry="4"
            className="fill-primary-600"
            style={{
              animation:
                power == 0
                  ? ''
                  : (power > 0 ? 'spinForward' : 'spinReverse') +
                    ' ' +
                    1 / Math.abs(power) +
                    's linear infinite',
            }}
          />
          <circle r="20" cx="50" cy="50" fill="#FFFFFF" />
          <text x="41.5" y="57" fill="black">
            M
          </text>
        </svg>

        <input
          type="range"
          className="vertical"
          id="slider"
          style={{
            position: 'absolute',
            top: 'calc(min(100%, 100vw) * 0.35 + ((100% - min(100%, 100vw)) * 0.5))',
            width: '16px',
            height: 'min(30%, 100vw * 0.3)',
            left:
              'calc(50% - min(calc(100vh - ' +
              dashTop +
              'px), 100vw) * 0.45 - 16px)',
          }}
          disabled={!controlActive}
          onChange={(e) => {
            setPower(Number(e.target.value) / 50 - 1);

            dispatch({
              type: 'SET_MOTOR',
              name: localStorage.getItem('motor') || 'motor',
              power: Number(e.target.value) / 50 - 1,
            });
          }}
        />
        <p
          style={{
            position: 'absolute',
            top: 'calc(min(100%, 100vw) * 0.35 + ((100% - min(100%, 100vw)) * 0.5) + min(30%, 100vw * 0.3))',
            left:
              'calc(50% - min(calc(100vh - ' +
              dashTop +
              'px), 100vw) * 0.45 - 16px)',
            fontWeight: 'lighter',
            color: power >= 0 ? '#77DD76' : '#FF6962',
          }}
        >
          {power >= 0
            ? String(power).substring(0, 4)
            : String(power).substring(0, 5)}
        </p>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <button
            type="button"
            className={
              controlActive
                ? 'me-2 mb-2 rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                : 'me-2 mb-2 rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900'
            }
            style={{
              position: 'absolute',
              top: '20px',
            }}
            onClick={() => {
              setControlActive(!controlActive);
              setControl(!controlActive ? 'web' : 'robot');
              setPower(0.0);
              setMotor('', 0.0);
              (document.getElementById('slider') as HTMLInputElement).value =
                '50.0';

              dispatch({
                type: 'SET_MOTOR',
                name: localStorage.getItem('motor') || 'motor',
                power: 0,
              });
            }}
          >
            {controlActive ? 'deactivate' : 'activate'}
          </button>
        </div>
      </div>
    );
  };

  let Content = (integrationPreset: Values<typeof IntegrationPreset>) => {
    switch (integrationPreset) {
      case 'STRAFER':
        return <Strafer />;
      case 'SINGLE_MOTOR':
        return <SingleMotor />;
    }
  };

  return (
    <BaseView
      className="flex flex-col overflow-auto"
      // isUnlocked={this.props.isUnlocked}
      tabIndex={0}
    >
      <div
        className="flex"
        id="integrationDiv"
        style={{
          height: '100%',
        }}
      >
        <BaseViewHeading>{Content(integrationPreset)}</BaseViewHeading>
      </div>
    </BaseView>
  );
}
