export const activityTotalsProp = {
  id: '152a1e2b',
  name: 'Activity 1',
  fundingSource: null,
  data: {
    combined: {
      2023: 3354831,
      2024: 1904245,
      total: 5259076
    },
    contractors: {
      2023: 1332756,
      2024: 542444,
      total: 1875200
    },
    expenses: {
      2023: 775000,
      2024: 75000,
      total: 850000
    },
    otherFunding: {
      2023: {
        contractors: 41713,
        expenses: 24256,
        statePersonnel: 39031,
        total: 105000
      },
      2024: {
        contractors: 0,
        expenses: 0,
        statePersonnel: 0,
        total: 0
      }
    },
    statePersonnel: {
      2023: 1247075,
      2024: 1286801,
      total: 2533876
    }
  }
};

const newExpected = {
  mando: {
    statePersonnel: {
      2023: {
        total: 2494150,
        federal: 1871134,
        medicaid: 2494845,
        state: 623711
      },
      total: {
        total: 2494150,
        federal: 1871134,
        medicaid: 2494845,
        state: 623711
      }
    },
    contractors: {
      2023: {
        total: 2665512,
        federal: 1375115,
        medicaid: 1833487,
        state: 458372
      },
      total: {
        total: 2665512,
        federal: 1375115,
        medicaid: 1833487,
        state: 458372
      }
    },
    expenses: {
      2023: {
        total: 1550000,
        federal: 619308,
        medicaid: 825744,
        state: 206436
      },
      total: {
        total: 1550000,
        federal: 619308,
        medicaid: 825744,
        state: 206436
      }
    },
    combined: {
      2023: {
        total: 6709662,
        federal: 3865557,
        medicaid: 5154076,
        state: 1288519
      },
      total: {
        total: 6709662,
        federal: 3865557,
        medicaid: 5154076,
        state: 1288519
      }
    }
  }
};

export const simplifiedBudgetProp = {
  mando: {
    statePersonnel: {
      2023: {
        total: 1247075,
        federal: 906033,
        medicaid: 1208044,
        state: 302011
      },
      total: {
        total: 1247075,
        federal: 906033,
        medicaid: 1208044,
        state: 302011
      }
    },
    contractors: {
      2023: {
        total: 1332756,
        federal: 968282,
        medicaid: 1291043,
        state: 322761
      },
      total: {
        total: 1332756,
        federal: 968282,
        medicaid: 1291043,
        state: 322761
      }
    },
    expenses: {
      2023: {
        total: 775000,
        federal: 563058,
        medicaid: 750744,
        state: 187686
      },
      total: {
        total: 775000,
        federal: 563058,
        medicaid: 750744,
        state: 187686
      }
    },
    combined: {
      2023: {
        total: 3354831,
        federal: 2437373,
        medicaid: 3249831,
        state: 812458
      },
      total: {
        total: 3354831,
        federal: 2437373,
        medicaid: 3249831,
        state: 812458
      }
    }
  }
};

export const budgetProp = {
  mmis: {
    statePersonnel: {
      2023: {
        total: 1247075,
        federal: 906033,
        medicaid: 1208044,
        state: 302011
      },
      2024: {
        total: 1286801,
        federal: 965101,
        medicaid: 1286801,
        state: 321700
      },
      total: {
        total: 2533876,
        federal: 1871134,
        medicaid: 2494845,
        state: 623711
      }
    },
    contractors: {
      2023: {
        total: 1332756,
        federal: 968282,
        medicaid: 1291043,
        state: 322761
      },
      2024: {
        total: 542444,
        federal: 406833,
        medicaid: 542444,
        state: 135611
      },
      total: {
        total: 1875200,
        federal: 1375115,
        medicaid: 1833487,
        state: 458372
      }
    },
    expenses: {
      2023: {
        total: 775000,
        federal: 563058,
        medicaid: 750744,
        state: 187686
      },
      2024: {
        total: 75000,
        federal: 56250,
        medicaid: 75000,
        state: 18750
      },
      total: {
        total: 850000,
        federal: 619308,
        medicaid: 825744,
        state: 206436
      }
    },
    combined: {
      2023: {
        total: 3454831,
        federal: 2518373,
        medicaid: 3339831,
        state: 821458
      },
      2024: {
        total: 2004245,
        federal: 1473184,
        medicaid: 1954245,
        state: 481061
      },
      total: {
        total: 5459076,
        federal: 3991557,
        medicaid: 5294076,
        state: 1302519
      }
    },
    keyStatePersonnel: {
      2023: {
        total: 100000,
        federal: 81000,
        medicaid: 90000,
        state: 9000
      },
      2024: {
        total: 100000,
        federal: 45000,
        medicaid: 50000,
        state: 5000
      },
      total: {
        total: 200000,
        federal: 126000,
        medicaid: 140000,
        state: 14000
      }
    }
  },
  ddi: {
    statePersonnel: {
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2024: {
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
    contractors: {
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2024: {
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
    expenses: {
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2024: {
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
      2023: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      2024: {
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
    }
  },
  mando: {
    statePersonnel: {
      2023: {
        total: 1247075,
        federal: 906033,
        medicaid: 1208044,
        state: 302011
      },
      2024: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 1247075,
        federal: 906033,
        medicaid: 1208044,
        state: 302011
      }
    },
    contractors: {
      2023: {
        total: 1332756,
        federal: 968282,
        medicaid: 1291043,
        state: 322761
      },
      2024: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 1332756,
        federal: 968282,
        medicaid: 1291043,
        state: 322761
      }
    },
    expenses: {
      2023: {
        total: 775000,
        federal: 563058,
        medicaid: 750744,
        state: 187686
      },
      2024: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 775000,
        federal: 563058,
        medicaid: 750744,
        state: 187686
      }
    },
    combined: {
      2023: {
        total: 3354831,
        federal: 2437373,
        medicaid: 3249831,
        state: 812458
      },
      2024: {
        total: 0,
        federal: 0,
        medicaid: 0,
        state: 0
      },
      total: {
        total: 3354831,
        federal: 2437373,
        medicaid: 3249831,
        state: 812458
      }
    }
  },
  combined: {
    2023: {
      total: 6809662,
      federal: 5873204,
      medicaid: 6694662,
      state: 4176289
    },
    2024: {
      total: 2004245,
      federal: 1473184,
      medicaid: 1954245,
      state: 481061
    },
    total: {
      total: 8813907,
      federal: 7346388,
      medicaid: 8648907,
      state: 4657350
    }
  },
  activityTotals: [],
  activities: {
    '152a1e2b': {
      costsByFFY: {
        2023: {
          federal: 2437373,
          medicaid: 3249831,
          state: 812458,
          total: 3354831
        },
        2024: {
          federal: 1428184,
          medicaid: 1904245,
          state: 476061,
          total: 1904245
        },
        total: {
          federal: 3865557,
          medicaid: 5154076,
          state: 1288519,
          total: 5259076
        }
      },
      quarterlyFFP: {
        years: {
          2023: {
            1: {
              combined: {
                dollars: 609345,
                percent: 0
              },
              contractors: {
                dollars: 242071,
                percent: 0.25
              },
              inHouse: {
                dollars: 367274,
                percent: 0.25
              }
            },
            2: {
              combined: {
                dollars: 609344,
                percent: 0
              },
              contractors: {
                dollars: 242071,
                percent: 0.25
              },
              inHouse: {
                dollars: 367273,
                percent: 0.25
              }
            },
            3: {
              combined: {
                dollars: 609342,
                percent: 0
              },
              contractors: {
                dollars: 242070,
                percent: 0.25
              },
              inHouse: {
                dollars: 367272,
                percent: 0.25
              }
            },
            4: {
              combined: {
                dollars: 609342,
                percent: 0
              },
              contractors: {
                dollars: 242070,
                percent: 0.25
              },
              inHouse: {
                dollars: 367272,
                percent: 0.25
              }
            },
            subtotal: {
              combined: {
                dollars: 2437373,
                percent: 0
              },
              contractors: {
                dollars: 968282,
                percent: 1
              },
              inHouse: {
                dollars: 1469091,
                percent: 1
              }
            }
          },
          2024: {
            1: {
              combined: {
                dollars: 0,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0
              },
              inHouse: {
                dollars: 0,
                percent: 0
              }
            },
            2: {
              combined: {
                dollars: 0,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0
              },
              inHouse: {
                dollars: 0,
                percent: 0
              }
            },
            3: {
              combined: {
                dollars: 0,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0
              },
              inHouse: {
                dollars: 0,
                percent: 0
              }
            },
            4: {
              combined: {
                dollars: 0,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0
              },
              inHouse: {
                dollars: 0,
                percent: 0
              }
            },
            subtotal: {
              combined: {
                dollars: 0,
                percent: 0
              },
              contractors: {
                dollars: 0,
                percent: 0
              },
              inHouse: {
                dollars: 0,
                percent: 0
              }
            }
          }
        },
        total: {
          combined: 2437373,
          contractors: 968282,
          inHouse: 1469091
        }
      }
    }
  },
  years: ['2023', '2024']
};

export const costCategoryShareProp = {
  fedShare: {
    contractors: 406833,
    expenses: 56250,
    statePersonnel: 965101
  },
  stateShare: {
    contractors: 135611,
    expenses: 18750,
    statePersonnel: 321700
  },
  medicaidShare: {
    contractors: 542444,
    expenses: 75000,
    statePersonnel: 1286801
  }
};
