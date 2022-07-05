function cov_1g10dp0i4u() {
  var path = "/home/dmirano/Developer/eAPD/web/src/fixtures/mo-hitech-budget.js";
  var hash = "192f16ea2f8c94265661e763fc5d4e24db987483";
  var global = new Function("return this")();
  var gcv = "__coverage__";
  var coverageData = {
    path: "/home/dmirano/Developer/eAPD/web/src/fixtures/mo-hitech-budget.js",
    statementMap: {
      "0": {
        start: {
          line: 1,
          column: 15
        },
        end: {
          line: 1839,
          column: 1
        }
      }
    },
    fnMap: {},
    branchMap: {},
    s: {
      "0": 0
    },
    f: {},
    b: {},
    _coverageSchema: "1a1c01bbd47fc00a2c39e90264f33305004495a9",
    hash: "192f16ea2f8c94265661e763fc5d4e24db987483"
  };
  var coverage = global[gcv] || (global[gcv] = {});

  if (!coverage[path] || coverage[path].hash !== hash) {
    coverage[path] = coverageData;
  }

  var actualCoverage = coverage[path];
  {
    // @ts-ignore
    cov_1g10dp0i4u = function () {
      return actualCoverage;
    };
  }
  return actualCoverage;
}

cov_1g10dp0i4u();
const budget = (cov_1g10dp0i4u().s[0]++, {
  activities: {
    '5714113d': {
      costsByFFY: {
        2020: {
          federal: 3109348,
          medicaidShare: 3454831,
          state: 345483,
          total: 3454831
        },
        2021: {
          federal: 1803821,
          medicaidShare: 2004245,
          state: 200424,
          total: 2004245
        },
        total: {
          federal: 4913169,
          medicaidShare: 5459076,
          state: 545907,
          total: 5459076
        }
      },
      quarterlyFFP: {
        2020: {
          1: {
            combined: {
              dollars: 777337,
              percent: 0
            },
            contractors: {
              dollars: 299870,
              percent: 0.25
            },
            inHouse: {
              dollars: 477467,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 777337,
              percent: 0
            },
            contractors: {
              dollars: 299870,
              percent: 0.25
            },
            inHouse: {
              dollars: 477467,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 777337,
              percent: 0
            },
            contractors: {
              dollars: 299870,
              percent: 0.25
            },
            inHouse: {
              dollars: 477467,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 777337,
              percent: 0
            },
            contractors: {
              dollars: 299870,
              percent: 0.25
            },
            inHouse: {
              dollars: 477467,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 3109348,
              percent: 0
            },
            contractors: {
              dollars: 1199480,
              percent: 1
            },
            inHouse: {
              dollars: 1909868,
              percent: 1
            }
          }
        },
        2021: {
          1: {
            combined: {
              dollars: 450956,
              percent: 0
            },
            contractors: {
              dollars: 122050,
              percent: 0.25
            },
            inHouse: {
              dollars: 328906,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 450955,
              percent: 0
            },
            contractors: {
              dollars: 122050,
              percent: 0.25
            },
            inHouse: {
              dollars: 328905,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 450955,
              percent: 0
            },
            contractors: {
              dollars: 122050,
              percent: 0.25
            },
            inHouse: {
              dollars: 328905,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 450955,
              percent: 0
            },
            contractors: {
              dollars: 122050,
              percent: 0.25
            },
            inHouse: {
              dollars: 328905,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 1803821,
              percent: 0
            },
            contractors: {
              dollars: 488200,
              percent: 1
            },
            inHouse: {
              dollars: 1315621,
              percent: 1
            }
          }
        },
        total: {
          combined: 4913169,
          contractors: 1687680,
          inHouse: 3225489
        }
      }
    },
    '2170fbea': {
      costsByFFY: {
        2020: {
          federal: 1622700,
          medicaidShare: 1803000,
          state: 180300,
          total: 1803000
        },
        2021: {
          federal: 2319750,
          medicaidShare: 3093000,
          state: 773250,
          total: 3093000
        },
        total: {
          federal: 3942450,
          medicaidShare: 4896000,
          state: 953550,
          total: 4896000
        }
      },
      quarterlyFFP: {
        2020: {
          1: {
            combined: {
              dollars: 405675,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 259425,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 405675,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 259425,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 405675,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 259425,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 405675,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 259425,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 1622700,
              percent: 0
            },
            contractors: {
              dollars: 585000,
              percent: 1
            },
            inHouse: {
              dollars: 1037700,
              percent: 1
            }
          }
        },
        2021: {
          1: {
            combined: {
              dollars: 579938,
              percent: 0
            },
            contractors: {
              dollars: 328125,
              percent: 0.25
            },
            inHouse: {
              dollars: 251813,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 579938,
              percent: 0
            },
            contractors: {
              dollars: 328125,
              percent: 0.25
            },
            inHouse: {
              dollars: 251813,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 579937,
              percent: 0
            },
            contractors: {
              dollars: 328125,
              percent: 0.25
            },
            inHouse: {
              dollars: 251812,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 579937,
              percent: 0
            },
            contractors: {
              dollars: 328125,
              percent: 0.25
            },
            inHouse: {
              dollars: 251812,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 2319750,
              percent: 0
            },
            contractors: {
              dollars: 1312500,
              percent: 1
            },
            inHouse: {
              dollars: 1007250,
              percent: 1
            }
          }
        },
        total: {
          combined: 3942450,
          contractors: 1897500,
          inHouse: 2044950
        }
      }
    },
    af9f9105: {
      costsByFFY: {
        2020: {
          federal: 414000,
          medicaidShare: 460000,
          state: 46000,
          total: 460000
        },
        2021: {
          federal: 428400,
          medicaidShare: 476000,
          state: 47600,
          total: 476000
        },
        total: {
          federal: 842400,
          medicaidShare: 936000,
          state: 93600,
          total: 936000
        }
      },
      quarterlyFFP: {
        2020: {
          1: {
            combined: {
              dollars: 103500,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 103500,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 103500,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 103500,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 103500,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 103500,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 103500,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 103500,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 414000,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 1
            },
            inHouse: {
              dollars: 414000,
              percent: 1
            }
          }
        },
        2021: {
          1: {
            combined: {
              dollars: 107100,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 107100,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 107100,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 107100,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 107100,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 107100,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 107100,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 0.25
            },
            inHouse: {
              dollars: 107100,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 428400,
              percent: 0
            },
            contractors: {
              dollars: 0,
              percent: 1
            },
            inHouse: {
              dollars: 428400,
              percent: 1
            }
          }
        },
        total: {
          combined: 842400,
          contractors: 0,
          inHouse: 842400
        }
      }
    },
    '5f66be81': {
      costsByFFY: {
        2020: {
          federal: 450000,
          medicaidShare: 500000,
          state: 50000,
          total: 500000
        },
        2021: {
          federal: 1800000,
          medicaidShare: 2000000,
          state: 200000,
          total: 2000000
        },
        total: {
          federal: 2250000,
          medicaidShare: 2500000,
          state: 250000,
          total: 2500000
        }
      },
      quarterlyFFP: {
        2020: {
          1: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 450000,
              percent: 0
            },
            contractors: {
              dollars: 450000,
              percent: 1
            },
            inHouse: {
              dollars: 0,
              percent: 1
            }
          }
        },
        2021: {
          1: {
            combined: {
              dollars: 450000,
              percent: 0
            },
            contractors: {
              dollars: 450000,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 450000,
              percent: 0
            },
            contractors: {
              dollars: 450000,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 450000,
              percent: 0
            },
            contractors: {
              dollars: 450000,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 450000,
              percent: 0
            },
            contractors: {
              dollars: 450000,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 1800000,
              percent: 0
            },
            contractors: {
              dollars: 1800000,
              percent: 1
            },
            inHouse: {
              dollars: 0,
              percent: 1
            }
          }
        },
        total: {
          combined: 2250000,
          contractors: 2250000,
          inHouse: 0
        }
      }
    },
    d0963842: {
      costsByFFY: {
        2020: {
          federal: 450000,
          medicaidShare: 500000,
          state: 50000,
          total: 500000
        },
        2021: {
          federal: 1350000,
          medicaidShare: 1500000,
          state: 150000,
          total: 1500000
        },
        total: {
          federal: 1800000,
          medicaidShare: 2000000,
          state: 200000,
          total: 2000000
        }
      },
      quarterlyFFP: {
        2020: {
          1: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 112500,
              percent: 0
            },
            contractors: {
              dollars: 112500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 450000,
              percent: 0
            },
            contractors: {
              dollars: 450000,
              percent: 1
            },
            inHouse: {
              dollars: 0,
              percent: 1
            }
          }
        },
        2021: {
          1: {
            combined: {
              dollars: 337500,
              percent: 0
            },
            contractors: {
              dollars: 337500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 337500,
              percent: 0
            },
            contractors: {
              dollars: 337500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 337500,
              percent: 0
            },
            contractors: {
              dollars: 337500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 337500,
              percent: 0
            },
            contractors: {
              dollars: 337500,
              percent: 0.25
            },
            inHouse: {
              dollars: 0,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 1350000,
              percent: 0
            },
            contractors: {
              dollars: 1350000,
              percent: 1
            },
            inHouse: {
              dollars: 0,
              percent: 1
            }
          }
        },
        total: {
          combined: 1800000,
          contractors: 1800000,
          inHouse: 0
        }
      }
    },
    '7bd7353f': {
      costsByFFY: {
        2020: {
          federal: 362500,
          medicaidShare: 725000,
          state: 362500,
          total: 725000
        },
        2021: {
          federal: 697500,
          medicaidShare: 775000,
          state: 77500,
          total: 775000
        },
        total: {
          federal: 1060000,
          medicaidShare: 1500000,
          state: 440000,
          total: 1500000
        }
      },
      quarterlyFFP: {
        2020: {
          1: {
            combined: {
              dollars: 90625,
              percent: 0
            },
            contractors: {
              dollars: 81250,
              percent: 0.25
            },
            inHouse: {
              dollars: 9375,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 90625,
              percent: 0
            },
            contractors: {
              dollars: 81250,
              percent: 0.25
            },
            inHouse: {
              dollars: 9375,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 90625,
              percent: 0
            },
            contractors: {
              dollars: 81250,
              percent: 0.25
            },
            inHouse: {
              dollars: 9375,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 90625,
              percent: 0
            },
            contractors: {
              dollars: 81250,
              percent: 0.25
            },
            inHouse: {
              dollars: 9375,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 362500,
              percent: 0
            },
            contractors: {
              dollars: 325000,
              percent: 1
            },
            inHouse: {
              dollars: 37500,
              percent: 1
            }
          }
        },
        2021: {
          1: {
            combined: {
              dollars: 174375,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 28125,
              percent: 0.25
            }
          },
          2: {
            combined: {
              dollars: 174375,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 28125,
              percent: 0.25
            }
          },
          3: {
            combined: {
              dollars: 174375,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 28125,
              percent: 0.25
            }
          },
          4: {
            combined: {
              dollars: 174375,
              percent: 0
            },
            contractors: {
              dollars: 146250,
              percent: 0.25
            },
            inHouse: {
              dollars: 28125,
              percent: 0.25
            }
          },
          subtotal: {
            combined: {
              dollars: 697500,
              percent: 0
            },
            contractors: {
              dollars: 585000,
              percent: 1
            },
            inHouse: {
              dollars: 112500,
              percent: 1
            }
          }
        },
        total: {
          combined: 1060000,
          contractors: 910000,
          inHouse: 150000
        }
      }
    }
  },
  combined: {
    2020: {
      total: 7442831,
      federal: 6408548,
      medicaid: 7442831,
      state: 1034283
    },
    2021: {
      total: 9848245,
      federal: 8399471,
      medicaid: 9848245,
      state: 1448774
    },
    total: {
      total: 17291076,
      federal: 14808019,
      medicaid: 17291076,
      state: 2483057
    }
  },
  federalShareByFFYQuarter: {
    hitAndHie: {
      2020: {
        1: {
          inHouse: 590342,
          contractors: 606120,
          combined: 1196462
        },
        2: {
          inHouse: 590342,
          contractors: 606120,
          combined: 1196462
        },
        3: {
          inHouse: 590342,
          contractors: 606120,
          combined: 1196462
        },
        4: {
          inHouse: 590342,
          contractors: 606120,
          combined: 1196462
        },
        subtotal: {
          inHouse: 2361368,
          contractors: 2424480,
          combined: 4785848
        }
      },
      2021: {
        1: {
          inHouse: 464131,
          contractors: 1055800,
          combined: 1519931
        },
        2: {
          inHouse: 464130,
          contractors: 1055800,
          combined: 1519930
        },
        3: {
          inHouse: 464130,
          contractors: 1055800,
          combined: 1519930
        },
        4: {
          inHouse: 464130,
          contractors: 1055800,
          combined: 1519930
        },
        subtotal: {
          inHouse: 1856521,
          contractors: 4223200,
          combined: 6079721
        }
      },
      total: {
        inHouse: 4217889,
        contractors: 6647680,
        combined: 10865569
      }
    },
    mmis: {
      2020: {
        1: {
          inHouse: 259425,
          contractors: 146250,
          combined: 405675
        },
        2: {
          inHouse: 259425,
          contractors: 146250,
          combined: 405675
        },
        3: {
          inHouse: 259425,
          contractors: 146250,
          combined: 405675
        },
        4: {
          inHouse: 259425,
          contractors: 146250,
          combined: 405675
        },
        subtotal: {
          inHouse: 1037700,
          contractors: 585000,
          combined: 1622700
        }
      },
      2021: {
        1: {
          inHouse: 251813,
          contractors: 328125,
          combined: 579938
        },
        2: {
          inHouse: 251813,
          contractors: 328125,
          combined: 579938
        },
        3: {
          inHouse: 251812,
          contractors: 328125,
          combined: 579937
        },
        4: {
          inHouse: 251812,
          contractors: 328125,
          combined: 579937
        },
        subtotal: {
          inHouse: 1007250,
          contractors: 1312500,
          combined: 2319750
        }
      },
      total: {
        inHouse: 2044950,
        contractors: 1897500,
        combined: 3942450
      }
    }
  },
  hie: {
    statePersonnel: {
      2020: {
        total: 460000,
        federal: 414000,
        medicaid: 460000,
        state: 46000
      },
      2021: {
        total: 476000,
        federal: 428400,
        medicaid: 476000,
        state: 47600
      },
      total: {
        total: 936000,
        federal: 842400,
        medicaid: 936000,
        state: 93600
      }
    },
    contractors: {
      2020: {
        total: 1000000,
        federal: 900000,
        medicaid: 1000000,
        state: 100000
      },
      2021: {
        total: 3500000,
        federal: 3150000,
        medicaid: 3500000,
        state: 350000
      },
      total: {
        total: 4500000,
        federal: 4050000,
        medicaid: 4500000,
        state: 450000
      }
    },
    expenses: {
      2020: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2021: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      }
    },
    combined: {
      2020: {
        total: 1460000,
        federal: 1314000,
        medicaid: 1460000,
        state: 146000
      },
      2021: {
        total: 3976000,
        federal: 3578400,
        medicaid: 3976000,
        state: 397600
      },
      total: {
        total: 5436000,
        federal: 4892400,
        medicaid: 5436000,
        state: 543600
      }
    }
  },
  hit: {
    statePersonnel: {
      2020: {
        total: 1397075,
        federal: 1237368,
        medicaid: 1397075,
        state: 159707
      },
      2021: {
        total: 1486801,
        federal: 1338121,
        medicaid: 1486801,
        state: 148680
      },
      total: {
        total: 2883876,
        federal: 2575489,
        medicaid: 2883876,
        state: 308387
      }
    },
    contractors: {
      2020: {
        total: 1982756,
        federal: 1524480,
        medicaid: 1982756,
        state: 458276
      },
      2021: {
        total: 1192444,
        federal: 1073200,
        medicaid: 1192444,
        state: 119244
      },
      total: {
        total: 3175200,
        federal: 2597680,
        medicaid: 3175200,
        state: 577520
      }
    },
    expenses: {
      2020: {
        total: 800000,
        federal: 710000,
        medicaid: 800000,
        state: 90000
      },
      2021: {
        total: 100000,
        federal: 90000,
        medicaid: 100000,
        state: 10000
      },
      total: {
        total: 900000,
        federal: 800000,
        medicaid: 900000,
        state: 100000
      }
    },
    combined: {
      2020: {
        total: 4179831,
        federal: 3471848,
        medicaid: 4179831,
        state: 707983
      },
      2021: {
        total: 2779245,
        federal: 2501321,
        medicaid: 2779245,
        state: 277924
      },
      total: {
        total: 6959076,
        federal: 5973169,
        medicaid: 6959076,
        state: 985907
      }
    }
  },
  mmis: {
    statePersonnel: {
      2020: {
        total: 1153000,
        federal: 1037700,
        medicaid: 1153000,
        state: 115300
      },
      2021: {
        total: 1343000,
        federal: 1007250,
        medicaid: 1343000,
        state: 335750
      },
      total: {
        total: 2496000,
        federal: 2044950,
        medicaid: 2496000,
        state: 451050
      }
    },
    contractors: {
      2020: {
        total: 650000,
        federal: 585000,
        medicaid: 650000,
        state: 65000
      },
      2021: {
        total: 1750000,
        federal: 1312500,
        medicaid: 1750000,
        state: 437500
      },
      total: {
        total: 2400000,
        federal: 1897500,
        medicaid: 2400000,
        state: 502500
      }
    },
    expenses: {
      2020: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2021: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      }
    },
    combined: {
      2020: {
        total: 1803000,
        federal: 1622700,
        medicaid: 1803000,
        state: 180300
      },
      2021: {
        total: 3093000,
        federal: 2319750,
        medicaid: 3093000,
        state: 773250
      },
      total: {
        total: 4896000,
        federal: 3942450,
        medicaid: 4896000,
        state: 953550
      }
    }
  },
  hitAndHie: {
    statePersonnel: {
      2020: {
        total: 1857075,
        federal: 1651368,
        medicaid: 1857075,
        state: 205707
      },
      2021: {
        total: 1962801,
        federal: 1766521,
        medicaid: 1962801,
        state: 196280
      },
      total: {
        total: 3819876,
        federal: 3417889,
        medicaid: 3819876,
        state: 401987
      }
    },
    contractors: {
      2020: {
        total: 2982756,
        federal: 2424480,
        medicaid: 2982756,
        state: 558276
      },
      2021: {
        total: 4692444,
        federal: 4223200,
        medicaid: 4692444,
        state: 469244
      },
      total: {
        total: 7675200,
        federal: 6647680,
        medicaid: 7675200,
        state: 1027520
      }
    },
    expenses: {
      2020: {
        total: 800000,
        federal: 710000,
        medicaid: 800000,
        state: 90000
      },
      2021: {
        total: 100000,
        federal: 90000,
        medicaid: 100000,
        state: 10000
      },
      total: {
        total: 900000,
        federal: 800000,
        medicaid: 900000,
        state: 100000
      }
    },
    combined: {
      2020: {
        total: 5639831,
        federal: 4785848,
        medicaid: 5639831,
        state: 853983
      },
      2021: {
        total: 6755245,
        federal: 6079721,
        medicaid: 6755245,
        state: 675524
      },
      total: {
        total: 12395076,
        federal: 10865569,
        medicaid: 12395076,
        state: 1529507
      }
    }
  },
  mmisByFFP: {
    '90-10': {
      2020: {
        total: 1803000,
        federal: 1622700,
        medicaid: 1803000,
        state: 180300
      },
      2021: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 1803000,
        federal: 1622700,
        medicaid: 1803000,
        state: 180300
      }
    },
    '75-25': {
      2020: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2021: {
        total: 3093000,
        federal: 2319750,
        medicaid: 3093000,
        state: 773250
      },
      total: {
        total: 3093000,
        federal: 2319750,
        medicaid: 3093000,
        state: 773250
      }
    },
    '50-50': {
      2020: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2021: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      }
    },
    combined: {
      2020: {
        total: 1803000,
        federal: 1622700,
        medicaid: 1803000,
        state: 180300
      },
      2021: {
        total: 3093000,
        federal: 2319750,
        medicaid: 3093000,
        state: 773250
      },
      total: {
        total: 4896000,
        federal: 3942450,
        medicaid: 4896000,
        state: 953550
      }
    }
  },
  activityTotals: [{
    fundingSource: 'HIT',
    name: 'Program Administration',
    data: {
      combined: {
        2020: 3454831,
        2021: 2004245,
        total: 5459076
      },
      contractors: {
        2020: 1332756,
        2021: 542444,
        total: 1875200
      },
      expenses: {
        2020: 775000,
        2021: 75000,
        total: 850000
      },
      otherFunding: {
        2020: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        },
        2021: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        }
      },
      statePersonnel: {
        2020: 1347075,
        2021: 1386801,
        total: 2733876
      }
    }
  }, {
    fundingSource: 'MMIS',
    name: 'HIE Claims Data Analytics',
    data: {
      combined: {
        2020: 1803000,
        2021: 3093000,
        total: 4896000
      },
      contractors: {
        2020: 650000,
        2021: 1750000,
        total: 2400000
      },
      expenses: {
        2020: 0,
        2021: 0,
        total: 0
      },
      otherFunding: {
        2020: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        },
        2021: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        }
      },
      statePersonnel: {
        2020: 1153000,
        2021: 1343000,
        total: 2496000
      }
    }
  }, {
    fundingSource: 'HIE',
    name: 'HIE Enhancement and Onboarding',
    data: {
      combined: {
        2020: 460000,
        2021: 476000,
        total: 936000
      },
      contractors: {
        2020: 0,
        2021: 0,
        total: 0
      },
      expenses: {
        2020: 0,
        2021: 0,
        total: 0
      },
      otherFunding: {
        2020: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        },
        2021: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        }
      },
      statePersonnel: {
        2020: 460000,
        2021: 476000,
        total: 936000
      }
    }
  }, {
    fundingSource: 'HIE',
    name: 'Medicaid Blue Button',
    data: {
      combined: {
        2020: 500000,
        2021: 2000000,
        total: 2500000
      },
      contractors: {
        2020: 500000,
        2021: 2000000,
        total: 2500000
      },
      expenses: {
        2020: 0,
        2021: 0,
        total: 0
      },
      otherFunding: {
        2020: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        },
        2021: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        }
      },
      statePersonnel: {
        2020: 0,
        2021: 0,
        total: 0
      }
    }
  }, {
    fundingSource: 'HIE',
    name: 'Public Health System Modernization',
    data: {
      combined: {
        2020: 500000,
        2021: 1500000,
        total: 2000000
      },
      contractors: {
        2020: 500000,
        2021: 1500000,
        total: 2000000
      },
      expenses: {
        2020: 0,
        2021: 0,
        total: 0
      },
      otherFunding: {
        2020: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        },
        2021: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        }
      },
      statePersonnel: {
        2020: 0,
        2021: 0,
        total: 0
      }
    }
  }, {
    fundingSource: 'HIT',
    name: 'MITA 3.0 Assessment',
    data: {
      combined: {
        2020: 725000,
        2021: 775000,
        total: 1500000
      },
      contractors: {
        2020: 650000,
        2021: 650000,
        total: 1300000
      },
      expenses: {
        2020: 25000,
        2021: 25000,
        total: 50000
      },
      otherFunding: {
        2020: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        },
        2021: {
          contractors: 0,
          expenses: 0,
          statePersonnel: 0,
          total: 0
        }
      },
      statePersonnel: {
        2020: 50000,
        2021: 100000,
        total: 150000
      }
    }
  }],
  years: ['2020', '2021']
});
export default budget;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6WyJidWRnZXQiLCJhY3Rpdml0aWVzIiwiY29zdHNCeUZGWSIsImZlZGVyYWwiLCJtZWRpY2FpZFNoYXJlIiwic3RhdGUiLCJ0b3RhbCIsInF1YXJ0ZXJseUZGUCIsImNvbWJpbmVkIiwiZG9sbGFycyIsInBlcmNlbnQiLCJjb250cmFjdG9ycyIsImluSG91c2UiLCJzdWJ0b3RhbCIsImFmOWY5MTA1IiwiZDA5NjM4NDIiLCJtZWRpY2FpZCIsImZlZGVyYWxTaGFyZUJ5RkZZUXVhcnRlciIsImhpdEFuZEhpZSIsIm1taXMiLCJoaWUiLCJzdGF0ZVBlcnNvbm5lbCIsImV4cGVuc2VzIiwiaGl0IiwibW1pc0J5RkZQIiwiYWN0aXZpdHlUb3RhbHMiLCJmdW5kaW5nU291cmNlIiwibmFtZSIsImRhdGEiLCJvdGhlckZ1bmRpbmciLCJ5ZWFycyJdLCJzb3VyY2VzIjpbIm1vLWhpdGVjaC1idWRnZXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgYnVkZ2V0ID0ge1xuICBhY3Rpdml0aWVzOiB7XG4gICAgJzU3MTQxMTNkJzoge1xuICAgICAgY29zdHNCeUZGWToge1xuICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgZmVkZXJhbDogMzEwOTM0OCxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiAzNDU0ODMxLFxuICAgICAgICAgIHN0YXRlOiAzNDU0ODMsXG4gICAgICAgICAgdG90YWw6IDM0NTQ4MzFcbiAgICAgICAgfSxcbiAgICAgICAgMjAyMToge1xuICAgICAgICAgIGZlZGVyYWw6IDE4MDM4MjEsXG4gICAgICAgICAgbWVkaWNhaWRTaGFyZTogMjAwNDI0NSxcbiAgICAgICAgICBzdGF0ZTogMjAwNDI0LFxuICAgICAgICAgIHRvdGFsOiAyMDA0MjQ1XG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgZmVkZXJhbDogNDkxMzE2OSxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiA1NDU5MDc2LFxuICAgICAgICAgIHN0YXRlOiA1NDU5MDcsXG4gICAgICAgICAgdG90YWw6IDU0NTkwNzZcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHF1YXJ0ZXJseUZGUDoge1xuICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgMToge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNzc3MzM3LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMjk5ODcwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0Nzc0NjcsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDI6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDc3NzMzNyxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDI5OTg3MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDc3NDY3LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAzOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA3NzczMzcsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAyOTk4NzAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQ3NzQ2NyxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNzc3MzM3LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMjk5ODcwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0Nzc0NjcsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1YnRvdGFsOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAzMTA5MzQ4LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTE5OTQ4MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTkwOTg2OCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgMjAyMToge1xuICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQ1MDk1NixcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEyMjA1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMzI4OTA2LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0NTA5NTUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMjIwNTAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDMyODkwNSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgMzoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDUwOTU1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTIyMDUwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAzMjg5MDUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDQ6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQ1MDk1NSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEyMjA1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMzI4OTA1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTgwMzgyMSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQ4ODIwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTMxNTYyMSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICBjb21iaW5lZDogNDkxMzE2OSxcbiAgICAgICAgICBjb250cmFjdG9yczogMTY4NzY4MCxcbiAgICAgICAgICBpbkhvdXNlOiAzMjI1NDg5XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICcyMTcwZmJlYSc6IHtcbiAgICAgIGNvc3RzQnlGRlk6IHtcbiAgICAgICAgMjAyMDoge1xuICAgICAgICAgIGZlZGVyYWw6IDE2MjI3MDAsXG4gICAgICAgICAgbWVkaWNhaWRTaGFyZTogMTgwMzAwMCxcbiAgICAgICAgICBzdGF0ZTogMTgwMzAwLFxuICAgICAgICAgIHRvdGFsOiAxODAzMDAwXG4gICAgICAgIH0sXG4gICAgICAgIDIwMjE6IHtcbiAgICAgICAgICBmZWRlcmFsOiAyMzE5NzUwLFxuICAgICAgICAgIG1lZGljYWlkU2hhcmU6IDMwOTMwMDAsXG4gICAgICAgICAgc3RhdGU6IDc3MzI1MCxcbiAgICAgICAgICB0b3RhbDogMzA5MzAwMFxuICAgICAgICB9LFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgIGZlZGVyYWw6IDM5NDI0NTAsXG4gICAgICAgICAgbWVkaWNhaWRTaGFyZTogNDg5NjAwMCxcbiAgICAgICAgICBzdGF0ZTogOTUzNTUwLFxuICAgICAgICAgIHRvdGFsOiA0ODk2MDAwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBxdWFydGVybHlGRlA6IHtcbiAgICAgICAgMjAyMDoge1xuICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQwNTY3NSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDE0NjI1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMjU5NDI1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0MDU2NzUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNDYyNTAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDI1OTQyNSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgMzoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDA1Njc1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTQ2MjUwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAyNTk0MjUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDQ6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQwNTY3NSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDE0NjI1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMjU5NDI1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTYyMjcwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDU4NTAwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTAzNzcwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgMjAyMToge1xuICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDU3OTkzOCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDMyODEyNSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMjUxODEzLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA1Nzk5MzgsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAzMjgxMjUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDI1MTgxMyxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgMzoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNTc5OTM3LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMzI4MTI1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAyNTE4MTIsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDQ6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDU3OTkzNyxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDMyODEyNSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMjUxODEyLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMjMxOTc1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEzMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEwMDcyNTAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgY29tYmluZWQ6IDM5NDI0NTAsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDE4OTc1MDAsXG4gICAgICAgICAgaW5Ib3VzZTogMjA0NDk1MFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBhZjlmOTEwNToge1xuICAgICAgY29zdHNCeUZGWToge1xuICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgZmVkZXJhbDogNDE0MDAwLFxuICAgICAgICAgIG1lZGljYWlkU2hhcmU6IDQ2MDAwMCxcbiAgICAgICAgICBzdGF0ZTogNDYwMDAsXG4gICAgICAgICAgdG90YWw6IDQ2MDAwMFxuICAgICAgICB9LFxuICAgICAgICAyMDIxOiB7XG4gICAgICAgICAgZmVkZXJhbDogNDI4NDAwLFxuICAgICAgICAgIG1lZGljYWlkU2hhcmU6IDQ3NjAwMCxcbiAgICAgICAgICBzdGF0ZTogNDc2MDAsXG4gICAgICAgICAgdG90YWw6IDQ3NjAwMFxuICAgICAgICB9LFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgIGZlZGVyYWw6IDg0MjQwMCxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiA5MzYwMDAsXG4gICAgICAgICAgc3RhdGU6IDkzNjAwLFxuICAgICAgICAgIHRvdGFsOiA5MzYwMDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHF1YXJ0ZXJseUZGUDoge1xuICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgMToge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTAzNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTAzNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMDM1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMDM1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDM6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEwMzUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEwMzUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTAzNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTAzNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDE0MDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDE0MDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAyMDIxOiB7XG4gICAgICAgICAgMToge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTA3MTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTA3MTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMDcxMDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMDcxMDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDM6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEwNzEwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDEwNzEwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTA3MTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTA3MTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDI4NDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDI4NDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgIGNvbWJpbmVkOiA4NDI0MDAsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDAsXG4gICAgICAgICAgaW5Ib3VzZTogODQyNDAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICc1ZjY2YmU4MSc6IHtcbiAgICAgIGNvc3RzQnlGRlk6IHtcbiAgICAgICAgMjAyMDoge1xuICAgICAgICAgIGZlZGVyYWw6IDQ1MDAwMCxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiA1MDAwMDAsXG4gICAgICAgICAgc3RhdGU6IDUwMDAwLFxuICAgICAgICAgIHRvdGFsOiA1MDAwMDBcbiAgICAgICAgfSxcbiAgICAgICAgMjAyMToge1xuICAgICAgICAgIGZlZGVyYWw6IDE4MDAwMDAsXG4gICAgICAgICAgbWVkaWNhaWRTaGFyZTogMjAwMDAwMCxcbiAgICAgICAgICBzdGF0ZTogMjAwMDAwLFxuICAgICAgICAgIHRvdGFsOiAyMDAwMDAwXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgZmVkZXJhbDogMjI1MDAwMCxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiAyNTAwMDAwLFxuICAgICAgICAgIHN0YXRlOiAyNTAwMDAsXG4gICAgICAgICAgdG90YWw6IDI1MDAwMDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHF1YXJ0ZXJseUZGUDoge1xuICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgMToge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTEyNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTEyNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDM6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDExMjUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDExMjUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTEyNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTEyNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDUwMDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDUwMDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAyMDIxOiB7XG4gICAgICAgICAgMToge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDUwMDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDUwMDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0NTAwMDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0NTAwMDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDM6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQ1MDAwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDQ1MDAwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDUwMDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNDUwMDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTgwMDAwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDE4MDAwMDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgY29tYmluZWQ6IDIyNTAwMDAsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDIyNTAwMDAsXG4gICAgICAgICAgaW5Ib3VzZTogMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICBkMDk2Mzg0Mjoge1xuICAgICAgY29zdHNCeUZGWToge1xuICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgZmVkZXJhbDogNDUwMDAwLFxuICAgICAgICAgIG1lZGljYWlkU2hhcmU6IDUwMDAwMCxcbiAgICAgICAgICBzdGF0ZTogNTAwMDAsXG4gICAgICAgICAgdG90YWw6IDUwMDAwMFxuICAgICAgICB9LFxuICAgICAgICAyMDIxOiB7XG4gICAgICAgICAgZmVkZXJhbDogMTM1MDAwMCxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiAxNTAwMDAwLFxuICAgICAgICAgIHN0YXRlOiAxNTAwMDAsXG4gICAgICAgICAgdG90YWw6IDE1MDAwMDBcbiAgICAgICAgfSxcbiAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICBmZWRlcmFsOiAxODAwMDAwLFxuICAgICAgICAgIG1lZGljYWlkU2hhcmU6IDIwMDAwMDAsXG4gICAgICAgICAgc3RhdGU6IDIwMDAwMCxcbiAgICAgICAgICB0b3RhbDogMjAwMDAwMFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcXVhcnRlcmx5RkZQOiB7XG4gICAgICAgIDIwMjA6IHtcbiAgICAgICAgICAxOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDI6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDExMjUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDExMjUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgMzoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTEyNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTEyNTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICA0OiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1YnRvdGFsOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0NTAwMDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA0NTAwMDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIDIwMjE6IHtcbiAgICAgICAgICAxOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAzMzc1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAzMzc1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIDI6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDMzNzUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDMzNzUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgMzoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMzM3NTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMzM3NTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICA0OiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAzMzc1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAzMzc1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHN1YnRvdGFsOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMzUwMDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMTM1MDAwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICBjb21iaW5lZDogMTgwMDAwMCxcbiAgICAgICAgICBjb250cmFjdG9yczogMTgwMDAwMCxcbiAgICAgICAgICBpbkhvdXNlOiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgICc3YmQ3MzUzZic6IHtcbiAgICAgIGNvc3RzQnlGRlk6IHtcbiAgICAgICAgMjAyMDoge1xuICAgICAgICAgIGZlZGVyYWw6IDM2MjUwMCxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiA3MjUwMDAsXG4gICAgICAgICAgc3RhdGU6IDM2MjUwMCxcbiAgICAgICAgICB0b3RhbDogNzI1MDAwXG4gICAgICAgIH0sXG4gICAgICAgIDIwMjE6IHtcbiAgICAgICAgICBmZWRlcmFsOiA2OTc1MDAsXG4gICAgICAgICAgbWVkaWNhaWRTaGFyZTogNzc1MDAwLFxuICAgICAgICAgIHN0YXRlOiA3NzUwMCxcbiAgICAgICAgICB0b3RhbDogNzc1MDAwXG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgZmVkZXJhbDogMTA2MDAwMCxcbiAgICAgICAgICBtZWRpY2FpZFNoYXJlOiAxNTAwMDAwLFxuICAgICAgICAgIHN0YXRlOiA0NDAwMDAsXG4gICAgICAgICAgdG90YWw6IDE1MDAwMDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHF1YXJ0ZXJseUZGUDoge1xuICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgMToge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTA2MjUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA4MTI1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTM3NSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgMjoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTA2MjUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA4MTI1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTM3NSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgMzoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTA2MjUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA4MTI1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTM3NSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgNDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTA2MjUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiA4MTI1MCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogOTM3NSxcbiAgICAgICAgICAgICAgcGVyY2VudDogMC4yNVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VidG90YWw6IHtcbiAgICAgICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDM2MjUwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDMyNTAwMCxcbiAgICAgICAgICAgICAgcGVyY2VudDogMVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluSG91c2U6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogMzc1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIDIwMjE6IHtcbiAgICAgICAgICAxOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNzQzNzUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNDYyNTAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDI4MTI1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAyOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNzQzNzUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNDYyNTAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDI4MTI1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICAzOiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNzQzNzUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNDYyNTAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDI4MTI1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICA0OiB7XG4gICAgICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNzQzNzUsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxNDYyNTAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDAuMjVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBpbkhvdXNlOiB7XG4gICAgICAgICAgICAgIGRvbGxhcnM6IDI4MTI1LFxuICAgICAgICAgICAgICBwZXJjZW50OiAwLjI1XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNjk3NTAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAgICAgZG9sbGFyczogNTg1MDAwLFxuICAgICAgICAgICAgICBwZXJjZW50OiAxXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5Ib3VzZToge1xuICAgICAgICAgICAgICBkb2xsYXJzOiAxMTI1MDAsXG4gICAgICAgICAgICAgIHBlcmNlbnQ6IDFcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgY29tYmluZWQ6IDEwNjAwMDAsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDkxMDAwMCxcbiAgICAgICAgICBpbkhvdXNlOiAxNTAwMDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY29tYmluZWQ6IHtcbiAgICAyMDIwOiB7XG4gICAgICB0b3RhbDogNzQ0MjgzMSxcbiAgICAgIGZlZGVyYWw6IDY0MDg1NDgsXG4gICAgICBtZWRpY2FpZDogNzQ0MjgzMSxcbiAgICAgIHN0YXRlOiAxMDM0MjgzXG4gICAgfSxcbiAgICAyMDIxOiB7XG4gICAgICB0b3RhbDogOTg0ODI0NSxcbiAgICAgIGZlZGVyYWw6IDgzOTk0NzEsXG4gICAgICBtZWRpY2FpZDogOTg0ODI0NSxcbiAgICAgIHN0YXRlOiAxNDQ4Nzc0XG4gICAgfSxcbiAgICB0b3RhbDoge1xuICAgICAgdG90YWw6IDE3MjkxMDc2LFxuICAgICAgZmVkZXJhbDogMTQ4MDgwMTksXG4gICAgICBtZWRpY2FpZDogMTcyOTEwNzYsXG4gICAgICBzdGF0ZTogMjQ4MzA1N1xuICAgIH1cbiAgfSxcbiAgZmVkZXJhbFNoYXJlQnlGRllRdWFydGVyOiB7XG4gICAgaGl0QW5kSGllOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIDE6IHtcbiAgICAgICAgICBpbkhvdXNlOiA1OTAzNDIsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDYwNjEyMCxcbiAgICAgICAgICBjb21iaW5lZDogMTE5NjQ2MlxuICAgICAgICB9LFxuICAgICAgICAyOiB7XG4gICAgICAgICAgaW5Ib3VzZTogNTkwMzQyLFxuICAgICAgICAgIGNvbnRyYWN0b3JzOiA2MDYxMjAsXG4gICAgICAgICAgY29tYmluZWQ6IDExOTY0NjJcbiAgICAgICAgfSxcbiAgICAgICAgMzoge1xuICAgICAgICAgIGluSG91c2U6IDU5MDM0MixcbiAgICAgICAgICBjb250cmFjdG9yczogNjA2MTIwLFxuICAgICAgICAgIGNvbWJpbmVkOiAxMTk2NDYyXG4gICAgICAgIH0sXG4gICAgICAgIDQ6IHtcbiAgICAgICAgICBpbkhvdXNlOiA1OTAzNDIsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDYwNjEyMCxcbiAgICAgICAgICBjb21iaW5lZDogMTE5NjQ2MlxuICAgICAgICB9LFxuICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgIGluSG91c2U6IDIzNjEzNjgsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDI0MjQ0ODAsXG4gICAgICAgICAgY29tYmluZWQ6IDQ3ODU4NDhcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgMToge1xuICAgICAgICAgIGluSG91c2U6IDQ2NDEzMSxcbiAgICAgICAgICBjb250cmFjdG9yczogMTA1NTgwMCxcbiAgICAgICAgICBjb21iaW5lZDogMTUxOTkzMVxuICAgICAgICB9LFxuICAgICAgICAyOiB7XG4gICAgICAgICAgaW5Ib3VzZTogNDY0MTMwLFxuICAgICAgICAgIGNvbnRyYWN0b3JzOiAxMDU1ODAwLFxuICAgICAgICAgIGNvbWJpbmVkOiAxNTE5OTMwXG4gICAgICAgIH0sXG4gICAgICAgIDM6IHtcbiAgICAgICAgICBpbkhvdXNlOiA0NjQxMzAsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDEwNTU4MDAsXG4gICAgICAgICAgY29tYmluZWQ6IDE1MTk5MzBcbiAgICAgICAgfSxcbiAgICAgICAgNDoge1xuICAgICAgICAgIGluSG91c2U6IDQ2NDEzMCxcbiAgICAgICAgICBjb250cmFjdG9yczogMTA1NTgwMCxcbiAgICAgICAgICBjb21iaW5lZDogMTUxOTkzMFxuICAgICAgICB9LFxuICAgICAgICBzdWJ0b3RhbDoge1xuICAgICAgICAgIGluSG91c2U6IDE4NTY1MjEsXG4gICAgICAgICAgY29udHJhY3RvcnM6IDQyMjMyMDAsXG4gICAgICAgICAgY29tYmluZWQ6IDYwNzk3MjFcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHRvdGFsOiB7XG4gICAgICAgIGluSG91c2U6IDQyMTc4ODksXG4gICAgICAgIGNvbnRyYWN0b3JzOiA2NjQ3NjgwLFxuICAgICAgICBjb21iaW5lZDogMTA4NjU1NjlcbiAgICAgIH1cbiAgICB9LFxuICAgIG1taXM6IHtcbiAgICAgIDIwMjA6IHtcbiAgICAgICAgMToge1xuICAgICAgICAgIGluSG91c2U6IDI1OTQyNSxcbiAgICAgICAgICBjb250cmFjdG9yczogMTQ2MjUwLFxuICAgICAgICAgIGNvbWJpbmVkOiA0MDU2NzVcbiAgICAgICAgfSxcbiAgICAgICAgMjoge1xuICAgICAgICAgIGluSG91c2U6IDI1OTQyNSxcbiAgICAgICAgICBjb250cmFjdG9yczogMTQ2MjUwLFxuICAgICAgICAgIGNvbWJpbmVkOiA0MDU2NzVcbiAgICAgICAgfSxcbiAgICAgICAgMzoge1xuICAgICAgICAgIGluSG91c2U6IDI1OTQyNSxcbiAgICAgICAgICBjb250cmFjdG9yczogMTQ2MjUwLFxuICAgICAgICAgIGNvbWJpbmVkOiA0MDU2NzVcbiAgICAgICAgfSxcbiAgICAgICAgNDoge1xuICAgICAgICAgIGluSG91c2U6IDI1OTQyNSxcbiAgICAgICAgICBjb250cmFjdG9yczogMTQ2MjUwLFxuICAgICAgICAgIGNvbWJpbmVkOiA0MDU2NzVcbiAgICAgICAgfSxcbiAgICAgICAgc3VidG90YWw6IHtcbiAgICAgICAgICBpbkhvdXNlOiAxMDM3NzAwLFxuICAgICAgICAgIGNvbnRyYWN0b3JzOiA1ODUwMDAsXG4gICAgICAgICAgY29tYmluZWQ6IDE2MjI3MDBcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgMToge1xuICAgICAgICAgIGluSG91c2U6IDI1MTgxMyxcbiAgICAgICAgICBjb250cmFjdG9yczogMzI4MTI1LFxuICAgICAgICAgIGNvbWJpbmVkOiA1Nzk5MzhcbiAgICAgICAgfSxcbiAgICAgICAgMjoge1xuICAgICAgICAgIGluSG91c2U6IDI1MTgxMyxcbiAgICAgICAgICBjb250cmFjdG9yczogMzI4MTI1LFxuICAgICAgICAgIGNvbWJpbmVkOiA1Nzk5MzhcbiAgICAgICAgfSxcbiAgICAgICAgMzoge1xuICAgICAgICAgIGluSG91c2U6IDI1MTgxMixcbiAgICAgICAgICBjb250cmFjdG9yczogMzI4MTI1LFxuICAgICAgICAgIGNvbWJpbmVkOiA1Nzk5MzdcbiAgICAgICAgfSxcbiAgICAgICAgNDoge1xuICAgICAgICAgIGluSG91c2U6IDI1MTgxMixcbiAgICAgICAgICBjb250cmFjdG9yczogMzI4MTI1LFxuICAgICAgICAgIGNvbWJpbmVkOiA1Nzk5MzdcbiAgICAgICAgfSxcbiAgICAgICAgc3VidG90YWw6IHtcbiAgICAgICAgICBpbkhvdXNlOiAxMDA3MjUwLFxuICAgICAgICAgIGNvbnRyYWN0b3JzOiAxMzEyNTAwLFxuICAgICAgICAgIGNvbWJpbmVkOiAyMzE5NzUwXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICBpbkhvdXNlOiAyMDQ0OTUwLFxuICAgICAgICBjb250cmFjdG9yczogMTg5NzUwMCxcbiAgICAgICAgY29tYmluZWQ6IDM5NDI0NTBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGhpZToge1xuICAgIHN0YXRlUGVyc29ubmVsOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiA0NjAwMDAsXG4gICAgICAgIGZlZGVyYWw6IDQxNDAwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDQ2MDAwMCxcbiAgICAgICAgc3RhdGU6IDQ2MDAwXG4gICAgICB9LFxuICAgICAgMjAyMToge1xuICAgICAgICB0b3RhbDogNDc2MDAwLFxuICAgICAgICBmZWRlcmFsOiA0Mjg0MDAsXG4gICAgICAgIG1lZGljYWlkOiA0NzYwMDAsXG4gICAgICAgIHN0YXRlOiA0NzYwMFxuICAgICAgfSxcbiAgICAgIHRvdGFsOiB7XG4gICAgICAgIHRvdGFsOiA5MzYwMDAsXG4gICAgICAgIGZlZGVyYWw6IDg0MjQwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDkzNjAwMCxcbiAgICAgICAgc3RhdGU6IDkzNjAwXG4gICAgICB9XG4gICAgfSxcbiAgICBjb250cmFjdG9yczoge1xuICAgICAgMjAyMDoge1xuICAgICAgICB0b3RhbDogMTAwMDAwMCxcbiAgICAgICAgZmVkZXJhbDogOTAwMDAwLFxuICAgICAgICBtZWRpY2FpZDogMTAwMDAwMCxcbiAgICAgICAgc3RhdGU6IDEwMDAwMFxuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgdG90YWw6IDM1MDAwMDAsXG4gICAgICAgIGZlZGVyYWw6IDMxNTAwMDAsXG4gICAgICAgIG1lZGljYWlkOiAzNTAwMDAwLFxuICAgICAgICBzdGF0ZTogMzUwMDAwXG4gICAgICB9LFxuICAgICAgdG90YWw6IHtcbiAgICAgICAgdG90YWw6IDQ1MDAwMDAsXG4gICAgICAgIGZlZGVyYWw6IDQwNTAwMDAsXG4gICAgICAgIG1lZGljYWlkOiA0NTAwMDAwLFxuICAgICAgICBzdGF0ZTogNDUwMDAwXG4gICAgICB9XG4gICAgfSxcbiAgICBleHBlbnNlczoge1xuICAgICAgMjAyMDoge1xuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgZmVkZXJhbDogMCxcbiAgICAgICAgbWVkaWNhaWQ6IDAsXG4gICAgICAgIHN0YXRlOiAwXG4gICAgICB9LFxuICAgICAgMjAyMToge1xuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgZmVkZXJhbDogMCxcbiAgICAgICAgbWVkaWNhaWQ6IDAsXG4gICAgICAgIHN0YXRlOiAwXG4gICAgICB9LFxuICAgICAgdG90YWw6IHtcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICAgIGZlZGVyYWw6IDAsXG4gICAgICAgIG1lZGljYWlkOiAwLFxuICAgICAgICBzdGF0ZTogMFxuICAgICAgfVxuICAgIH0sXG4gICAgY29tYmluZWQ6IHtcbiAgICAgIDIwMjA6IHtcbiAgICAgICAgdG90YWw6IDE0NjAwMDAsXG4gICAgICAgIGZlZGVyYWw6IDEzMTQwMDAsXG4gICAgICAgIG1lZGljYWlkOiAxNDYwMDAwLFxuICAgICAgICBzdGF0ZTogMTQ2MDAwXG4gICAgICB9LFxuICAgICAgMjAyMToge1xuICAgICAgICB0b3RhbDogMzk3NjAwMCxcbiAgICAgICAgZmVkZXJhbDogMzU3ODQwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDM5NzYwMDAsXG4gICAgICAgIHN0YXRlOiAzOTc2MDBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogNTQzNjAwMCxcbiAgICAgICAgZmVkZXJhbDogNDg5MjQwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDU0MzYwMDAsXG4gICAgICAgIHN0YXRlOiA1NDM2MDBcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGhpdDoge1xuICAgIHN0YXRlUGVyc29ubmVsOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiAxMzk3MDc1LFxuICAgICAgICBmZWRlcmFsOiAxMjM3MzY4LFxuICAgICAgICBtZWRpY2FpZDogMTM5NzA3NSxcbiAgICAgICAgc3RhdGU6IDE1OTcwN1xuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgdG90YWw6IDE0ODY4MDEsXG4gICAgICAgIGZlZGVyYWw6IDEzMzgxMjEsXG4gICAgICAgIG1lZGljYWlkOiAxNDg2ODAxLFxuICAgICAgICBzdGF0ZTogMTQ4NjgwXG4gICAgICB9LFxuICAgICAgdG90YWw6IHtcbiAgICAgICAgdG90YWw6IDI4ODM4NzYsXG4gICAgICAgIGZlZGVyYWw6IDI1NzU0ODksXG4gICAgICAgIG1lZGljYWlkOiAyODgzODc2LFxuICAgICAgICBzdGF0ZTogMzA4Mzg3XG4gICAgICB9XG4gICAgfSxcbiAgICBjb250cmFjdG9yczoge1xuICAgICAgMjAyMDoge1xuICAgICAgICB0b3RhbDogMTk4Mjc1NixcbiAgICAgICAgZmVkZXJhbDogMTUyNDQ4MCxcbiAgICAgICAgbWVkaWNhaWQ6IDE5ODI3NTYsXG4gICAgICAgIHN0YXRlOiA0NTgyNzZcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAxMTkyNDQ0LFxuICAgICAgICBmZWRlcmFsOiAxMDczMjAwLFxuICAgICAgICBtZWRpY2FpZDogMTE5MjQ0NCxcbiAgICAgICAgc3RhdGU6IDExOTI0NFxuICAgICAgfSxcbiAgICAgIHRvdGFsOiB7XG4gICAgICAgIHRvdGFsOiAzMTc1MjAwLFxuICAgICAgICBmZWRlcmFsOiAyNTk3NjgwLFxuICAgICAgICBtZWRpY2FpZDogMzE3NTIwMCxcbiAgICAgICAgc3RhdGU6IDU3NzUyMFxuICAgICAgfVxuICAgIH0sXG4gICAgZXhwZW5zZXM6IHtcbiAgICAgIDIwMjA6IHtcbiAgICAgICAgdG90YWw6IDgwMDAwMCxcbiAgICAgICAgZmVkZXJhbDogNzEwMDAwLFxuICAgICAgICBtZWRpY2FpZDogODAwMDAwLFxuICAgICAgICBzdGF0ZTogOTAwMDBcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAxMDAwMDAsXG4gICAgICAgIGZlZGVyYWw6IDkwMDAwLFxuICAgICAgICBtZWRpY2FpZDogMTAwMDAwLFxuICAgICAgICBzdGF0ZTogMTAwMDBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogOTAwMDAwLFxuICAgICAgICBmZWRlcmFsOiA4MDAwMDAsXG4gICAgICAgIG1lZGljYWlkOiA5MDAwMDAsXG4gICAgICAgIHN0YXRlOiAxMDAwMDBcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbWJpbmVkOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiA0MTc5ODMxLFxuICAgICAgICBmZWRlcmFsOiAzNDcxODQ4LFxuICAgICAgICBtZWRpY2FpZDogNDE3OTgzMSxcbiAgICAgICAgc3RhdGU6IDcwNzk4M1xuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgdG90YWw6IDI3NzkyNDUsXG4gICAgICAgIGZlZGVyYWw6IDI1MDEzMjEsXG4gICAgICAgIG1lZGljYWlkOiAyNzc5MjQ1LFxuICAgICAgICBzdGF0ZTogMjc3OTI0XG4gICAgICB9LFxuICAgICAgdG90YWw6IHtcbiAgICAgICAgdG90YWw6IDY5NTkwNzYsXG4gICAgICAgIGZlZGVyYWw6IDU5NzMxNjksXG4gICAgICAgIG1lZGljYWlkOiA2OTU5MDc2LFxuICAgICAgICBzdGF0ZTogOTg1OTA3XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBtbWlzOiB7XG4gICAgc3RhdGVQZXJzb25uZWw6IHtcbiAgICAgIDIwMjA6IHtcbiAgICAgICAgdG90YWw6IDExNTMwMDAsXG4gICAgICAgIGZlZGVyYWw6IDEwMzc3MDAsXG4gICAgICAgIG1lZGljYWlkOiAxMTUzMDAwLFxuICAgICAgICBzdGF0ZTogMTE1MzAwXG4gICAgICB9LFxuICAgICAgMjAyMToge1xuICAgICAgICB0b3RhbDogMTM0MzAwMCxcbiAgICAgICAgZmVkZXJhbDogMTAwNzI1MCxcbiAgICAgICAgbWVkaWNhaWQ6IDEzNDMwMDAsXG4gICAgICAgIHN0YXRlOiAzMzU3NTBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogMjQ5NjAwMCxcbiAgICAgICAgZmVkZXJhbDogMjA0NDk1MCxcbiAgICAgICAgbWVkaWNhaWQ6IDI0OTYwMDAsXG4gICAgICAgIHN0YXRlOiA0NTEwNTBcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiA2NTAwMDAsXG4gICAgICAgIGZlZGVyYWw6IDU4NTAwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDY1MDAwMCxcbiAgICAgICAgc3RhdGU6IDY1MDAwXG4gICAgICB9LFxuICAgICAgMjAyMToge1xuICAgICAgICB0b3RhbDogMTc1MDAwMCxcbiAgICAgICAgZmVkZXJhbDogMTMxMjUwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDE3NTAwMDAsXG4gICAgICAgIHN0YXRlOiA0Mzc1MDBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogMjQwMDAwMCxcbiAgICAgICAgZmVkZXJhbDogMTg5NzUwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDI0MDAwMDAsXG4gICAgICAgIHN0YXRlOiA1MDI1MDBcbiAgICAgIH1cbiAgICB9LFxuICAgIGV4cGVuc2VzOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBmZWRlcmFsOiAwLFxuICAgICAgICBtZWRpY2FpZDogMCxcbiAgICAgICAgc3RhdGU6IDBcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBmZWRlcmFsOiAwLFxuICAgICAgICBtZWRpY2FpZDogMCxcbiAgICAgICAgc3RhdGU6IDBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgZmVkZXJhbDogMCxcbiAgICAgICAgbWVkaWNhaWQ6IDAsXG4gICAgICAgIHN0YXRlOiAwXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21iaW5lZDoge1xuICAgICAgMjAyMDoge1xuICAgICAgICB0b3RhbDogMTgwMzAwMCxcbiAgICAgICAgZmVkZXJhbDogMTYyMjcwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDE4MDMwMDAsXG4gICAgICAgIHN0YXRlOiAxODAzMDBcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAzMDkzMDAwLFxuICAgICAgICBmZWRlcmFsOiAyMzE5NzUwLFxuICAgICAgICBtZWRpY2FpZDogMzA5MzAwMCxcbiAgICAgICAgc3RhdGU6IDc3MzI1MFxuICAgICAgfSxcbiAgICAgIHRvdGFsOiB7XG4gICAgICAgIHRvdGFsOiA0ODk2MDAwLFxuICAgICAgICBmZWRlcmFsOiAzOTQyNDUwLFxuICAgICAgICBtZWRpY2FpZDogNDg5NjAwMCxcbiAgICAgICAgc3RhdGU6IDk1MzU1MFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgaGl0QW5kSGllOiB7XG4gICAgc3RhdGVQZXJzb25uZWw6IHtcbiAgICAgIDIwMjA6IHtcbiAgICAgICAgdG90YWw6IDE4NTcwNzUsXG4gICAgICAgIGZlZGVyYWw6IDE2NTEzNjgsXG4gICAgICAgIG1lZGljYWlkOiAxODU3MDc1LFxuICAgICAgICBzdGF0ZTogMjA1NzA3XG4gICAgICB9LFxuICAgICAgMjAyMToge1xuICAgICAgICB0b3RhbDogMTk2MjgwMSxcbiAgICAgICAgZmVkZXJhbDogMTc2NjUyMSxcbiAgICAgICAgbWVkaWNhaWQ6IDE5NjI4MDEsXG4gICAgICAgIHN0YXRlOiAxOTYyODBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogMzgxOTg3NixcbiAgICAgICAgZmVkZXJhbDogMzQxNzg4OSxcbiAgICAgICAgbWVkaWNhaWQ6IDM4MTk4NzYsXG4gICAgICAgIHN0YXRlOiA0MDE5ODdcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiAyOTgyNzU2LFxuICAgICAgICBmZWRlcmFsOiAyNDI0NDgwLFxuICAgICAgICBtZWRpY2FpZDogMjk4Mjc1NixcbiAgICAgICAgc3RhdGU6IDU1ODI3NlxuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgdG90YWw6IDQ2OTI0NDQsXG4gICAgICAgIGZlZGVyYWw6IDQyMjMyMDAsXG4gICAgICAgIG1lZGljYWlkOiA0NjkyNDQ0LFxuICAgICAgICBzdGF0ZTogNDY5MjQ0XG4gICAgICB9LFxuICAgICAgdG90YWw6IHtcbiAgICAgICAgdG90YWw6IDc2NzUyMDAsXG4gICAgICAgIGZlZGVyYWw6IDY2NDc2ODAsXG4gICAgICAgIG1lZGljYWlkOiA3Njc1MjAwLFxuICAgICAgICBzdGF0ZTogMTAyNzUyMFxuICAgICAgfVxuICAgIH0sXG4gICAgZXhwZW5zZXM6IHtcbiAgICAgIDIwMjA6IHtcbiAgICAgICAgdG90YWw6IDgwMDAwMCxcbiAgICAgICAgZmVkZXJhbDogNzEwMDAwLFxuICAgICAgICBtZWRpY2FpZDogODAwMDAwLFxuICAgICAgICBzdGF0ZTogOTAwMDBcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAxMDAwMDAsXG4gICAgICAgIGZlZGVyYWw6IDkwMDAwLFxuICAgICAgICBtZWRpY2FpZDogMTAwMDAwLFxuICAgICAgICBzdGF0ZTogMTAwMDBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogOTAwMDAwLFxuICAgICAgICBmZWRlcmFsOiA4MDAwMDAsXG4gICAgICAgIG1lZGljYWlkOiA5MDAwMDAsXG4gICAgICAgIHN0YXRlOiAxMDAwMDBcbiAgICAgIH1cbiAgICB9LFxuICAgIGNvbWJpbmVkOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiA1NjM5ODMxLFxuICAgICAgICBmZWRlcmFsOiA0Nzg1ODQ4LFxuICAgICAgICBtZWRpY2FpZDogNTYzOTgzMSxcbiAgICAgICAgc3RhdGU6IDg1Mzk4M1xuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgdG90YWw6IDY3NTUyNDUsXG4gICAgICAgIGZlZGVyYWw6IDYwNzk3MjEsXG4gICAgICAgIG1lZGljYWlkOiA2NzU1MjQ1LFxuICAgICAgICBzdGF0ZTogNjc1NTI0XG4gICAgICB9LFxuICAgICAgdG90YWw6IHtcbiAgICAgICAgdG90YWw6IDEyMzk1MDc2LFxuICAgICAgICBmZWRlcmFsOiAxMDg2NTU2OSxcbiAgICAgICAgbWVkaWNhaWQ6IDEyMzk1MDc2LFxuICAgICAgICBzdGF0ZTogMTUyOTUwN1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgbW1pc0J5RkZQOiB7XG4gICAgJzkwLTEwJzoge1xuICAgICAgMjAyMDoge1xuICAgICAgICB0b3RhbDogMTgwMzAwMCxcbiAgICAgICAgZmVkZXJhbDogMTYyMjcwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDE4MDMwMDAsXG4gICAgICAgIHN0YXRlOiAxODAzMDBcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBmZWRlcmFsOiAwLFxuICAgICAgICBtZWRpY2FpZDogMCxcbiAgICAgICAgc3RhdGU6IDBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogMTgwMzAwMCxcbiAgICAgICAgZmVkZXJhbDogMTYyMjcwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDE4MDMwMDAsXG4gICAgICAgIHN0YXRlOiAxODAzMDBcbiAgICAgIH1cbiAgICB9LFxuICAgICc3NS0yNSc6IHtcbiAgICAgIDIwMjA6IHtcbiAgICAgICAgdG90YWw6IDAsXG4gICAgICAgIGZlZGVyYWw6IDAsXG4gICAgICAgIG1lZGljYWlkOiAwLFxuICAgICAgICBzdGF0ZTogMFxuICAgICAgfSxcbiAgICAgIDIwMjE6IHtcbiAgICAgICAgdG90YWw6IDMwOTMwMDAsXG4gICAgICAgIGZlZGVyYWw6IDIzMTk3NTAsXG4gICAgICAgIG1lZGljYWlkOiAzMDkzMDAwLFxuICAgICAgICBzdGF0ZTogNzczMjUwXG4gICAgICB9LFxuICAgICAgdG90YWw6IHtcbiAgICAgICAgdG90YWw6IDMwOTMwMDAsXG4gICAgICAgIGZlZGVyYWw6IDIzMTk3NTAsXG4gICAgICAgIG1lZGljYWlkOiAzMDkzMDAwLFxuICAgICAgICBzdGF0ZTogNzczMjUwXG4gICAgICB9XG4gICAgfSxcbiAgICAnNTAtNTAnOiB7XG4gICAgICAyMDIwOiB7XG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBmZWRlcmFsOiAwLFxuICAgICAgICBtZWRpY2FpZDogMCxcbiAgICAgICAgc3RhdGU6IDBcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAwLFxuICAgICAgICBmZWRlcmFsOiAwLFxuICAgICAgICBtZWRpY2FpZDogMCxcbiAgICAgICAgc3RhdGU6IDBcbiAgICAgIH0sXG4gICAgICB0b3RhbDoge1xuICAgICAgICB0b3RhbDogMCxcbiAgICAgICAgZmVkZXJhbDogMCxcbiAgICAgICAgbWVkaWNhaWQ6IDAsXG4gICAgICAgIHN0YXRlOiAwXG4gICAgICB9XG4gICAgfSxcbiAgICBjb21iaW5lZDoge1xuICAgICAgMjAyMDoge1xuICAgICAgICB0b3RhbDogMTgwMzAwMCxcbiAgICAgICAgZmVkZXJhbDogMTYyMjcwMCxcbiAgICAgICAgbWVkaWNhaWQ6IDE4MDMwMDAsXG4gICAgICAgIHN0YXRlOiAxODAzMDBcbiAgICAgIH0sXG4gICAgICAyMDIxOiB7XG4gICAgICAgIHRvdGFsOiAzMDkzMDAwLFxuICAgICAgICBmZWRlcmFsOiAyMzE5NzUwLFxuICAgICAgICBtZWRpY2FpZDogMzA5MzAwMCxcbiAgICAgICAgc3RhdGU6IDc3MzI1MFxuICAgICAgfSxcbiAgICAgIHRvdGFsOiB7XG4gICAgICAgIHRvdGFsOiA0ODk2MDAwLFxuICAgICAgICBmZWRlcmFsOiAzOTQyNDUwLFxuICAgICAgICBtZWRpY2FpZDogNDg5NjAwMCxcbiAgICAgICAgc3RhdGU6IDk1MzU1MFxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgYWN0aXZpdHlUb3RhbHM6IFtcbiAgICB7XG4gICAgICBmdW5kaW5nU291cmNlOiAnSElUJyxcbiAgICAgIG5hbWU6ICdQcm9ncmFtIEFkbWluaXN0cmF0aW9uJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAyMDIwOiAzNDU0ODMxLFxuICAgICAgICAgIDIwMjE6IDIwMDQyNDUsXG4gICAgICAgICAgdG90YWw6IDU0NTkwNzZcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAyMDIwOiAxMzMyNzU2LFxuICAgICAgICAgIDIwMjE6IDU0MjQ0NCxcbiAgICAgICAgICB0b3RhbDogMTg3NTIwMFxuICAgICAgICB9LFxuICAgICAgICBleHBlbnNlczoge1xuICAgICAgICAgIDIwMjA6IDc3NTAwMCxcbiAgICAgICAgICAyMDIxOiA3NTAwMCxcbiAgICAgICAgICB0b3RhbDogODUwMDAwXG4gICAgICAgIH0sXG4gICAgICAgIG90aGVyRnVuZGluZzoge1xuICAgICAgICAgIDIwMjA6IHtcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiAwLFxuICAgICAgICAgICAgZXhwZW5zZXM6IDAsXG4gICAgICAgICAgICBzdGF0ZVBlcnNvbm5lbDogMCxcbiAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICAyMDIxOiB7XG4gICAgICAgICAgICBjb250cmFjdG9yczogMCxcbiAgICAgICAgICAgIGV4cGVuc2VzOiAwLFxuICAgICAgICAgICAgc3RhdGVQZXJzb25uZWw6IDAsXG4gICAgICAgICAgICB0b3RhbDogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGVQZXJzb25uZWw6IHtcbiAgICAgICAgICAyMDIwOiAxMzQ3MDc1LFxuICAgICAgICAgIDIwMjE6IDEzODY4MDEsXG4gICAgICAgICAgdG90YWw6IDI3MzM4NzZcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgZnVuZGluZ1NvdXJjZTogJ01NSVMnLFxuICAgICAgbmFtZTogJ0hJRSBDbGFpbXMgRGF0YSBBbmFseXRpY3MnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgIDIwMjA6IDE4MDMwMDAsXG4gICAgICAgICAgMjAyMTogMzA5MzAwMCxcbiAgICAgICAgICB0b3RhbDogNDg5NjAwMFxuICAgICAgICB9LFxuICAgICAgICBjb250cmFjdG9yczoge1xuICAgICAgICAgIDIwMjA6IDY1MDAwMCxcbiAgICAgICAgICAyMDIxOiAxNzUwMDAwLFxuICAgICAgICAgIHRvdGFsOiAyNDAwMDAwXG4gICAgICAgIH0sXG4gICAgICAgIGV4cGVuc2VzOiB7XG4gICAgICAgICAgMjAyMDogMCxcbiAgICAgICAgICAyMDIxOiAwLFxuICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgIH0sXG4gICAgICAgIG90aGVyRnVuZGluZzoge1xuICAgICAgICAgIDIwMjA6IHtcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiAwLFxuICAgICAgICAgICAgZXhwZW5zZXM6IDAsXG4gICAgICAgICAgICBzdGF0ZVBlcnNvbm5lbDogMCxcbiAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgICAgfSxcbiAgICAgICAgICAyMDIxOiB7XG4gICAgICAgICAgICBjb250cmFjdG9yczogMCxcbiAgICAgICAgICAgIGV4cGVuc2VzOiAwLFxuICAgICAgICAgICAgc3RhdGVQZXJzb25uZWw6IDAsXG4gICAgICAgICAgICB0b3RhbDogMFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgc3RhdGVQZXJzb25uZWw6IHtcbiAgICAgICAgICAyMDIwOiAxMTUzMDAwLFxuICAgICAgICAgIDIwMjE6IDEzNDMwMDAsXG4gICAgICAgICAgdG90YWw6IDI0OTYwMDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAge1xuICAgICAgZnVuZGluZ1NvdXJjZTogJ0hJRScsXG4gICAgICBuYW1lOiAnSElFIEVuaGFuY2VtZW50IGFuZCBPbmJvYXJkaW5nJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAyMDIwOiA0NjAwMDAsXG4gICAgICAgICAgMjAyMTogNDc2MDAwLFxuICAgICAgICAgIHRvdGFsOiA5MzYwMDBcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAyMDIwOiAwLFxuICAgICAgICAgIDIwMjE6IDAsXG4gICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgfSxcbiAgICAgICAgZXhwZW5zZXM6IHtcbiAgICAgICAgICAyMDIwOiAwLFxuICAgICAgICAgIDIwMjE6IDAsXG4gICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJGdW5kaW5nOiB7XG4gICAgICAgICAgMjAyMDoge1xuICAgICAgICAgICAgY29udHJhY3RvcnM6IDAsXG4gICAgICAgICAgICBleHBlbnNlczogMCxcbiAgICAgICAgICAgIHN0YXRlUGVyc29ubmVsOiAwLFxuICAgICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDIwMjE6IHtcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiAwLFxuICAgICAgICAgICAgZXhwZW5zZXM6IDAsXG4gICAgICAgICAgICBzdGF0ZVBlcnNvbm5lbDogMCxcbiAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdGF0ZVBlcnNvbm5lbDoge1xuICAgICAgICAgIDIwMjA6IDQ2MDAwMCxcbiAgICAgICAgICAyMDIxOiA0NzYwMDAsXG4gICAgICAgICAgdG90YWw6IDkzNjAwMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBmdW5kaW5nU291cmNlOiAnSElFJyxcbiAgICAgIG5hbWU6ICdNZWRpY2FpZCBCbHVlIEJ1dHRvbicsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIGNvbWJpbmVkOiB7XG4gICAgICAgICAgMjAyMDogNTAwMDAwLFxuICAgICAgICAgIDIwMjE6IDIwMDAwMDAsXG4gICAgICAgICAgdG90YWw6IDI1MDAwMDBcbiAgICAgICAgfSxcbiAgICAgICAgY29udHJhY3RvcnM6IHtcbiAgICAgICAgICAyMDIwOiA1MDAwMDAsXG4gICAgICAgICAgMjAyMTogMjAwMDAwMCxcbiAgICAgICAgICB0b3RhbDogMjUwMDAwMFxuICAgICAgICB9LFxuICAgICAgICBleHBlbnNlczoge1xuICAgICAgICAgIDIwMjA6IDAsXG4gICAgICAgICAgMjAyMTogMCxcbiAgICAgICAgICB0b3RhbDogMFxuICAgICAgICB9LFxuICAgICAgICBvdGhlckZ1bmRpbmc6IHtcbiAgICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgICBjb250cmFjdG9yczogMCxcbiAgICAgICAgICAgIGV4cGVuc2VzOiAwLFxuICAgICAgICAgICAgc3RhdGVQZXJzb25uZWw6IDAsXG4gICAgICAgICAgICB0b3RhbDogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMjAyMToge1xuICAgICAgICAgICAgY29udHJhY3RvcnM6IDAsXG4gICAgICAgICAgICBleHBlbnNlczogMCxcbiAgICAgICAgICAgIHN0YXRlUGVyc29ubmVsOiAwLFxuICAgICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRlUGVyc29ubmVsOiB7XG4gICAgICAgICAgMjAyMDogMCxcbiAgICAgICAgICAyMDIxOiAwLFxuICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHtcbiAgICAgIGZ1bmRpbmdTb3VyY2U6ICdISUUnLFxuICAgICAgbmFtZTogJ1B1YmxpYyBIZWFsdGggU3lzdGVtIE1vZGVybml6YXRpb24nLFxuICAgICAgZGF0YToge1xuICAgICAgICBjb21iaW5lZDoge1xuICAgICAgICAgIDIwMjA6IDUwMDAwMCxcbiAgICAgICAgICAyMDIxOiAxNTAwMDAwLFxuICAgICAgICAgIHRvdGFsOiAyMDAwMDAwXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgMjAyMDogNTAwMDAwLFxuICAgICAgICAgIDIwMjE6IDE1MDAwMDAsXG4gICAgICAgICAgdG90YWw6IDIwMDAwMDBcbiAgICAgICAgfSxcbiAgICAgICAgZXhwZW5zZXM6IHtcbiAgICAgICAgICAyMDIwOiAwLFxuICAgICAgICAgIDIwMjE6IDAsXG4gICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJGdW5kaW5nOiB7XG4gICAgICAgICAgMjAyMDoge1xuICAgICAgICAgICAgY29udHJhY3RvcnM6IDAsXG4gICAgICAgICAgICBleHBlbnNlczogMCxcbiAgICAgICAgICAgIHN0YXRlUGVyc29ubmVsOiAwLFxuICAgICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgICB9LFxuICAgICAgICAgIDIwMjE6IHtcbiAgICAgICAgICAgIGNvbnRyYWN0b3JzOiAwLFxuICAgICAgICAgICAgZXhwZW5zZXM6IDAsXG4gICAgICAgICAgICBzdGF0ZVBlcnNvbm5lbDogMCxcbiAgICAgICAgICAgIHRvdGFsOiAwXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBzdGF0ZVBlcnNvbm5lbDoge1xuICAgICAgICAgIDIwMjA6IDAsXG4gICAgICAgICAgMjAyMTogMCxcbiAgICAgICAgICB0b3RhbDogMFxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB7XG4gICAgICBmdW5kaW5nU291cmNlOiAnSElUJyxcbiAgICAgIG5hbWU6ICdNSVRBIDMuMCBBc3Nlc3NtZW50JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY29tYmluZWQ6IHtcbiAgICAgICAgICAyMDIwOiA3MjUwMDAsXG4gICAgICAgICAgMjAyMTogNzc1MDAwLFxuICAgICAgICAgIHRvdGFsOiAxNTAwMDAwXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRyYWN0b3JzOiB7XG4gICAgICAgICAgMjAyMDogNjUwMDAwLFxuICAgICAgICAgIDIwMjE6IDY1MDAwMCxcbiAgICAgICAgICB0b3RhbDogMTMwMDAwMFxuICAgICAgICB9LFxuICAgICAgICBleHBlbnNlczoge1xuICAgICAgICAgIDIwMjA6IDI1MDAwLFxuICAgICAgICAgIDIwMjE6IDI1MDAwLFxuICAgICAgICAgIHRvdGFsOiA1MDAwMFxuICAgICAgICB9LFxuICAgICAgICBvdGhlckZ1bmRpbmc6IHtcbiAgICAgICAgICAyMDIwOiB7XG4gICAgICAgICAgICBjb250cmFjdG9yczogMCxcbiAgICAgICAgICAgIGV4cGVuc2VzOiAwLFxuICAgICAgICAgICAgc3RhdGVQZXJzb25uZWw6IDAsXG4gICAgICAgICAgICB0b3RhbDogMFxuICAgICAgICAgIH0sXG4gICAgICAgICAgMjAyMToge1xuICAgICAgICAgICAgY29udHJhY3RvcnM6IDAsXG4gICAgICAgICAgICBleHBlbnNlczogMCxcbiAgICAgICAgICAgIHN0YXRlUGVyc29ubmVsOiAwLFxuICAgICAgICAgICAgdG90YWw6IDBcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHN0YXRlUGVyc29ubmVsOiB7XG4gICAgICAgICAgMjAyMDogNTAwMDAsXG4gICAgICAgICAgMjAyMTogMTAwMDAwLFxuICAgICAgICAgIHRvdGFsOiAxNTAwMDBcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgXSxcbiAgeWVhcnM6IFsnMjAyMCcsICcyMDIxJ11cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGJ1ZGdldDtcbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWVZOzs7Ozs7Ozs7QUFmWixNQUFNQSxNQUFNLDZCQUFHO0VBQ2JDLFVBQVUsRUFBRTtJQUNWLFlBQVk7TUFDVkMsVUFBVSxFQUFFO1FBQ1YsTUFBTTtVQUNKQyxPQUFPLEVBQUUsT0FETDtVQUVKQyxhQUFhLEVBQUUsT0FGWDtVQUdKQyxLQUFLLEVBQUUsTUFISDtVQUlKQyxLQUFLLEVBQUU7UUFKSCxDQURJO1FBT1YsTUFBTTtVQUNKSCxPQUFPLEVBQUUsT0FETDtVQUVKQyxhQUFhLEVBQUUsT0FGWDtVQUdKQyxLQUFLLEVBQUUsTUFISDtVQUlKQyxLQUFLLEVBQUU7UUFKSCxDQVBJO1FBYVZBLEtBQUssRUFBRTtVQUNMSCxPQUFPLEVBQUUsT0FESjtVQUVMQyxhQUFhLEVBQUUsT0FGVjtVQUdMQyxLQUFLLEVBQUUsTUFIRjtVQUlMQyxLQUFLLEVBQUU7UUFKRjtNQWJHLENBREY7TUFxQlZDLFlBQVksRUFBRTtRQUNaLE1BQU07VUFDSixHQUFHO1lBQ0RDLFFBQVEsRUFBRTtjQUNSQyxPQUFPLEVBQUUsTUFERDtjQUVSQyxPQUFPLEVBQUU7WUFGRCxDQURUO1lB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