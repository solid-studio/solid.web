// import '@testing-library/react/cleanup-after-each';
// import 'jest-axe/extend-expect'
import 'jsdom-worker-fix'
import '@testing-library/jest-dom/extend-expect'

// TODO: Remove this
// class Worker { // OR I CAN EVEN USE THIS
//     url: string
//     onmessage: any
//     constructor(stringUrl: string) {
//         this.url = stringUrl;
//         this.onmessage = () => { };
//     }

//     postMessage(msg: string) {
//         this.onmessage(msg);
//     }
// }

// (window as any).Worker = Worker;
