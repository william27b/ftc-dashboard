import { CSSProperties, Fragment, useId } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import clsx from 'clsx';

import { ReactComponent as PaletteIcon } from '@/assets/icons/palette.svg';
import { ReactComponent as DarkIcon } from '@/assets/icons/dark_mode.svg';
import { ReactComponent as LightIcon } from '@/assets/icons/light_mode.svg';

import { colors, Colors, useTheme, useThemeDispatch } from '@/hooks/useTheme';

import { Configure } from '@/components/views/IntegrationView/Config';
import { Values } from '@/typeHelpers';
import { validate } from 'uuid';

export default function SettingsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const id = useId();

  const theme = useTheme();
  const themeDispatch = useThemeDispatch();

  return (
    <Transition as={Fragment} show={isOpen}>
      <Dialog onClose={onClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-150"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>

        {/* Dialog body */}
        <div className="fixed inset-0 overflow-y-auto text-black dark:text-white">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-md bg-white py-6 text-left align-middle shadow-xl transition-all dark:bg-slate-700">
                {/* Config Header */}
                <div className="flex items-center justify-between px-6">
                  <h3 className="text-xl font-bold">Motor Configuration</h3>
                </div>
                <br />
                <div className="items-center justify-between px-6">
                  <table>
                    {Object.entries(Configure).map(([mainKey, value]) => (
                      <>
                        <h2 className="text-xl">{mainKey}</h2>
                        <tbody>
                          {Object.entries(value).map(([key, value]) => (
                            <tr key={key}>
                              <th className="text-lg font-thin">{key}:</th>
                              <input
                                type="text"
                                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                                defaultValue={
                                  localStorage.getItem(value) || value
                                }
                                onChange={(evt) => {
                                  if (evt.target.value == '')
                                    evt.target.value = value;

                                  localStorage.setItem(value, evt.target.value);
                                }}
                              />
                            </tr>
                          ))}
                        </tbody>
                        <br />
                      </>
                    ))}
                  </table>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
