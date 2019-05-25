/// <reference types="react-scripts" />

declare module 'react-console-emulator';


declare module 'worker-loader!*' {
    class WebpackWorker extends Worker {
        constructor();
    }

    export = WebpackWorker;
}

declare function importScripts(...urls: string[]): void;

declare module "solc"