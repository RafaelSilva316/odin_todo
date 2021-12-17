const controller = (() => {
  let currProj;
  const getCurrProj = function () {
    return currProj;
  };
  const setCurrProj = function (project) {
    currProj = project;
  };
  return { getCurrProj, setCurrProj };
})();

export { controller };
