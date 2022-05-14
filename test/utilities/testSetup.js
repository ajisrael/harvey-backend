import sinon from 'sinon';

const stubLogs = () => {
  sinon.stub(console, 'log'); // disable console.log
  sinon.stub(console, 'info'); // disable console.info
  sinon.stub(console, 'warn'); // disable console.warn
  sinon.stub(console, 'error'); // disable console.error
};

const restoreLogs = () => {
  console.log.restore();
  console.info.restore();
  console.warn.restore();
  console.error.restore();
};

export { stubLogs, restoreLogs };
