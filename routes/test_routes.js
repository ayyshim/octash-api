module.exports = router => {
  router.get("/", (req, res) => {
    res.json({
      status: 1,
      msg: "1 + 1 = 2"
    });
  });

  return router;
};
