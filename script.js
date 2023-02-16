obj = {
  progress: 0
};

act2 = new aae()
  .addScene({
    actor: obj,
    target: {
      progress: 100
    },
    duration: 10,
    starttime: 2,
  });

act2.play(() => {
  document.getElementById("output").innerText = JSON.stringify(obj);
});