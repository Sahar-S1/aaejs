divActor = {
  marginx: 0,
  marginy: 0,
};

divTargetx = {
  marginx: 50,
};

divTargety = {
  marginy: 15,
};

act3 = new aae();

act3.addScene({
  actor: divActor,
  target: divTargetx,
  starttime: 3,
  duration: 10,
  loop: true,
  easing: thereNBack,
});

act3.addScene({
  actor: divActor,
  target: divTargety,
  starttime: 3,
  duration: 5,
  loop: true,
  easing: (t) => easeInOutCubic(thereNBack(t)),
});

act3.play(() => {
  document.getElementById("eg").style = "margin-left:" + divActor.marginx + "%; margin-top:" + divActor.marginy + "%;";
});
