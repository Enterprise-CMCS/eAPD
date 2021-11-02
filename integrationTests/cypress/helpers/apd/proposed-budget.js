import ProposedBudgetPage from '../../page-objects/proposed-budget-page';
import ActivitySchedulePage from '../../page-objects/activity-schedule-page';
import ExportPage from '../../page-objects/export-page';

export const testDefaultProposedBudget = years => {
  let proposedBudgetPage;
  let activityList;
  let budgetData;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const activityPage = new ActivitySchedulePage();
    cy.goToActivityScheduleSummary();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = activityPage.getActivityScheduleOverviewNameList();
  });

  beforeEach(() => {
    cy.fixture('proposed-budget-test.json').then(data => {
      budgetData = data;
    });
    cy.goToProposedBudget();
  });

  it('should go to the correct page', () => {
    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });
    cy.log(`years: ${JSON.stringify(years)}`);
  });

  describe('Default values in Summary Budget by Activity', () => {
    it('should have default values of $0 for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: budgetData.defaultSummaryBudgetByActivity
      });
    });

    it('should have default values of $0 for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: budgetData.defaultActivityBreakdown
      });
    });
  });

  describe('Default values for Summary Budget Table by Expense Type', () => {
    it('should have default values of $0 for Expense Type tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years,
        expected: budgetData.defaultSummaryBudgetTable.byTypes
      });
    });

    it('should have default values of $0 for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: budgetData.defaultSummaryBudgetTable.totals
      });
    });
  });

  describe('Default values for Quarterly Federal Share by FFP', () => {
    it('should have default values of $0 for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });

    it('should have default values of $0 for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });
  });

  describe('Default values for Estimated Quarterly Incentive Payments', () => {
    it('should have default values for FFY tables', () => {
      proposedBudgetPage.verifyEQIPFormByFFY({
        years,
        expected: budgetData.defaultEQIPForm
      });
    });
  });
};

export const testDefaultProposedBudgetExportView = years => {
  let proposedBudgetPage;
  let activityList;
  let budgetData;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const exportPage = new ExportPage();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = exportPage.getActivityScheduleOverviewNameList();
  });

  beforeEach(() => {
    cy.fixture('proposed-budget-test.json').then(data => {
      budgetData = data;
    });
  });

  describe('Default values in Summary Budget by Activity', () => {
    it('should have default values of $0 for Total Computable Medicaid Cost', () => {
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({
        years,
        expected: budgetData.defaultSummaryBudgetByActivity
      });
    });

    it('should have default values of $0 for Activity Breakdown', () => {
      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected: budgetData.defaultActivityBreakdown
      });
    });
  });

  describe('Default values for Summary Budget Table by Expense Type', () => {
    it('should have default values of $0 for Expense Type Tables', () => {
      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years,
        expected: budgetData.defaultSummaryBudgetTable.byTypes
      });
    });

    it('should have default values of $0 for Activities Totals table', () => {
      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected: budgetData.defaultSummaryBudgetTable.totals
      });
    });
  });

  describe('Default values for Quarterly Federal Share by FFP', () => {
    it('should have default values of $0 for FFY tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });

    it('should have default values of $0 for Total tables', () => {
      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected: budgetData.defaultQuarterlyFederalShare
      });
    });
  });

  describe('Default values for Estimated Quarterly Incentive Payments', () => {
    it('should have default values for FFY tables', () => {
      proposedBudgetPage.verifyEQIPViewByFFY({
        years,
        expected: budgetData.defaultEQIPView
      });
    });
  });
};

const calculateCostsByActivityOrProgramType = ({
  years,
  staff,
  expenses,
  privateContractors,
  totals
}) => {
  const staffCosts = new Array(years.length);
  const expensesCosts = new Array(years.length);
  const contractorCosts = new Array(years.length);
  const ffyTotals = new Array(years.length);

  years.forEach((year, yearIndex) => {
    const staffCost = staff
      .map(emp => emp.costs[yearIndex] * emp.ftes[yearIndex])
      .reduce((acc, curr) => acc + curr, 0);

    const expenseCost = expenses
      .map(expense => expense.costs[yearIndex])
      .reduce((acc, curr) => acc + curr, 0);

    const contractorCost = privateContractors
      .map(contractor => {
        if (Array.isArray(contractor.FFYcosts[yearIndex])) {
          return (
            contractor.FFYcosts[yearIndex][0] *
            contractor.FFYcosts[yearIndex][1]
          );
        }
        return contractor.FFYcosts[yearIndex];
      })
      .reduce((acc, curr) => acc + curr, 0);

    const total = staffCost + expenseCost + contractorCost;

    staffCosts[yearIndex] = {
      items: staff.map(emp => ({
        name: emp.title,
        salary: emp.costs[yearIndex],
        ftes: emp.ftes[yearIndex],
        costs: emp.costs[yearIndex] * emp.ftes[yearIndex]
      })),
      total: staffCost,
      other: Math.round(totals.other[yearIndex] * (staffCost / total)),
      subtotal: Math.round(
        staffCost - totals.other[yearIndex] * (staffCost / total)
      ),
      fedShare: Math.round(staffCost * totals.fedShare[yearIndex]),
      stateShare: Math.round(staffCost * (1 - totals.fedShare[yearIndex]))
    };

    expensesCosts[yearIndex] = {
      items: expenses.map(expense => ({
        name: expense.category,
        costs: expense.costs[yearIndex]
      })),
      total: expenseCost,
      other: Math.round(totals.other[yearIndex] * (expenseCost / total)),
      subtotal: Math.round(
        expenseCost - totals.other[yearIndex] * (expenseCost / total)
      ),
      fedShare: Math.round(expenseCost * totals.fedShare[yearIndex]),
      stateShare: Math.round(expenseCost * (1 - totals.fedShare[yearIndex]))
    };

    contractorCosts[yearIndex] = {
      items: privateContractors.map(contractor => ({
        name: contractor.name,
        costs: Array.isArray(contractor.FFYcosts[yearIndex])
          ? contractor.FFYcosts[yearIndex][0] *
            contractor.FFYcosts[yearIndex][1]
          : contractor.FFYcosts[yearIndex]
      })),
      total: contractorCost,
      other: Math.round(totals.other[yearIndex] * (contractorCost / total)),
      subtotal: Math.round(
        contractorCost - totals.other[yearIndex] * (contractorCost / total)
      ),
      fedShare: Math.round(contractorCost * totals.fedShare[yearIndex]),
      stateShare: Math.round(contractorCost * (1 - totals.fedShare[yearIndex]))
    };
    ffyTotals[yearIndex] = total - totals.other[yearIndex];
  });
  return {
    staff: staffCosts,
    expenses: expensesCosts,
    privateContractors: {
      FFYcosts: contractorCosts,
      totalCosts: privateContractors
        .map(contractor => contractor.totalCosts)
        .reduce((acc, curr) => acc + curr, 0)
    },
    ffyTotals
  };
};

const calculateComputableMedicaidCostByFFY = ({ years, activityBudget }) => years.map((year, yearIndex) => ({
    programTypes: {
      HIT: {
        // activityBudget[0] is HIT
        'State Staff Total': activityBudget[0].staff[yearIndex].subtotal,
        'Other State Expenses Total':
          activityBudget[0].expenses[yearIndex].subtotal,
        'Private Contractor Total':
          activityBudget[0].privateContractors.FFYcosts[yearIndex].subtotal,
        'HIT Total': activityBudget[0].ffyTotals[yearIndex]
      },
      HIE: {
        // activityBudget[1] is HIE
        'State Staff Total': activityBudget[1].staff[yearIndex].subtotal,
        'Other State Expenses Total':
          activityBudget[1].expenses[yearIndex].subtotal,
        'Private Contractor Total':
          activityBudget[1].privateContractors.FFYcosts[yearIndex].subtotal,
        'HIE Total': activityBudget[1].ffyTotals[yearIndex]
      },
      MMIS: {
        'State Staff Total': 0,
        'Other State Expenses Total': 0,
        'Private Contractor Total': 0,
        'MMIS Total': 0
      }
    },
    totalComputableMedicaidCost:
      activityBudget[0].ffyTotals[yearIndex] +
      activityBudget[1].ffyTotals[yearIndex]
  }));

const calculateActvityBreakdownByFFYAndActivity = ({ years, activityBudget }) => years.map((year, yearIndex) =>
activityBudget.forEach(activity => {
  const stateStaff = {
    'Other Funding Amount': activity.staff[yearIndex].other,
    'State Staff Subtotal': activity.staff[yearIndex].subtotal
  };
  const stateExpenses = {
    'Other Funding Amount': activity.expenses[yearIndex].other,
    'Other State Expenses Subtotal':
      activity.expenses[yearIndex].subtotal
  };
  const privateContractors = {
    'Other Funding Amount':
      activity.privateContractors.FFYcosts[yearIndex].other,
    'Private Contractor Subtotal':
      activity.privateContractors.FFYcosts[yearIndex].subtotal
  };

  activity.staff[yearIndex].items.forEach(item => {
    stateStaff[item.name] = [item.salary, item.ftes, item.costs];
  });

  activity.expenses[yearIndex].items.forEach(item => {
    stateExpenses[item.name] = [item.costs];
  });

  activity.privateContractors.FFYcosts[yearIndex].items.forEach(
    item => {
      privateContractors[item.name] = [item.costs];
    }
  );

  return {
    expenses: {
      'State Staff': stateStaff,
      'Other State Expenses': stateExpenses,
      'Private Contractor': privateContractors
    },
    totalComputableMedicaidCost: activity.ffyTotals[yearIndex]
  };
})
);

const calculateSummaryBudgetTableByTypeAndFFY = ({ years, activityBudget }) => {
  const HIT = years.map((year, yearIndex) => ({
    'State Staff': [
      activityBudget[0].staff[yearIndex].stateShare,
      activityBudget[0].staff[yearIndex].fedShare,
      activityBudget[0].staff[yearIndex].total
    ],
    'Other State Expenses': [
      activityBudget[0].expenses[yearIndex].stateShare,
      activityBudget[0].expenses[yearIndex].fedShare,
      activityBudget[0].expenses[yearIndex].total
    ],
    'Private Contractor': [
      activityBudget[0].privateContractors.FFYcosts[yearIndex].stateShare,
      activityBudget[0].privateContractors.FFYcosts[yearIndex].fedShare,
      activityBudget[0].privateContractors.FFYcosts[yearIndex].total
    ],
    Subtotal: [
      activityBudget[0].staff[yearIndex].stateShare +
        activityBudget[0].expenses[yearIndex].stateShare +
        activityBudget[0].privateContractors.FFYcosts[yearIndex].stateShare,
      activityBudget[0].staff[yearIndex].fedShare +
        activityBudget[0].expenses[yearIndex].fedShare +
        activityBudget[0].privateContractors.FFYcosts[yearIndex].fedShare,
      activityBudget[0].staff[yearIndex].total +
        activityBudget[0].expenses[yearIndex].total +
        activityBudget[0].privateContractors.FFYcosts[yearIndex].total
    ]
  }));
  HIT.push({
    'State Staff': [
      HIT.map(hit => hit['State Staff']).reduce((acc, curr) => acc + curr),
      HIT.map(hit => hit['State Staff']).reduce((acc, curr) => acc + curr),
      HIT.map(hit => hit['State Staff']).reduce((acc, curr) => acc + curr)
    ],
    'Other State Expenses': [
      HIT.map(hit => hit['Other State Expenses']).reduce(
        (acc, curr) => acc + curr
      ),
      HIT.map(hit => hit['Other State Expenses']).reduce(
        (acc, curr) => acc + curr
      ),
      HIT.map(hit => hit['Other State Expenses']).reduce(
        (acc, curr) => acc + curr
      )
    ],
    'Private Contractor': [
      HIT.map(hit => hit['Private Contractor']).reduce(
        (acc, curr) => acc + curr
      ),
      HIT.map(hit => hit['Private Contractor']).reduce(
        (acc, curr) => acc + curr
      ),
      HIT.map(hit => hit['Private Contractor']).reduce(
        (acc, curr) => acc + curr
      )
    ],
    Subtotal: [
      HIT.map(hit => hit.Subtotal).reduce((acc, curr) => acc + curr),
      HIT.map(hit => hit.Subtotal).reduce((acc, curr) => acc + curr),
      HIT.map(hit => hit.Subtotal).reduce((acc, curr) => acc + curr)
    ]
  });
  const HIE = years.map((year, yearIndex) => ({
    'State Staff': [
      activityBudget[0].staff[yearIndex].stateShare,
      activityBudget[0].staff[yearIndex].fedShare,
      activityBudget[0].staff[yearIndex].total
    ],
    'Other State Expenses': [
      activityBudget[0].expenses[yearIndex].stateShare,
      activityBudget[0].expenses[yearIndex].fedShare,
      activityBudget[0].expenses[yearIndex].total
    ],
    'Private Contractor': [
      activityBudget[0].privateContractors.FFYcosts[yearIndex].stateShare,
      activityBudget[0].privateContractors.FFYcosts[yearIndex].fedShare,
      activityBudget[0].privateContractors.FFYcosts[yearIndex].total
    ],
    Subtotal: [
      activityBudget[0].staff[yearIndex].stateShare +
        activityBudget[0].expenses[yearIndex].stateShare +
        activityBudget[0].privateContractors.FFYcosts[yearIndex].stateShare,
      activityBudget[0].staff[yearIndex].fedShare +
        activityBudget[0].expenses[yearIndex].fedShare +
        activityBudget[0].privateContractors.FFYcosts[yearIndex].fedShare,
      activityBudget[0].staff[yearIndex].total +
        activityBudget[0].expenses[yearIndex].total +
        activityBudget[0].privateContractors.FFYcosts[yearIndex].total
    ]
  }));
  HIE.push({
    'State Staff': [
      HIE.map(hie => hie['State Staff']).reduce((acc, curr) => acc + curr),
      HIE.map(hie => hie['State Staff']).reduce((acc, curr) => acc + curr),
      HIE.map(hie => hie['State Staff']).reduce((acc, curr) => acc + curr)
    ],
    'Other State Expenses': [
      HIE.map(hie => hie['Other State Expenses']).reduce(
        (acc, curr) => acc + curr
      ),
      HIE.map(hie => hie['Other State Expenses']).reduce(
        (acc, curr) => acc + curr
      ),
      HIE.map(hie => hie['Other State Expenses']).reduce(
        (acc, curr) => acc + curr
      )
    ],
    'Private Contractor': [
      HIE.map(hie => hie['Private Contractor']).reduce(
        (acc, curr) => acc + curr
      ),
      HIE.map(hie => hie['Private Contractor']).reduce(
        (acc, curr) => acc + curr
      ),
      HIE.map(hie => hie['Private Contractor']).reduce(
        (acc, curr) => acc + curr
      )
    ],
    Subtotal: [
      HIE.map(hie => hie.Subtotal).reduce((acc, curr) => acc + curr),
      HIE.map(hie => hie.Subtotal).reduce((acc, curr) => acc + curr),
      HIE.map(hie => hie.Subtotal).reduce((acc, curr) => acc + curr)
    ]
  });
  return {
    byTypes: {
      HIT,
      HIE,
      MMIS: [
        {
          'State Staff': [0, 0, 0],
          'Other State Expenses': [0, 0, 0],
          'Private Contractor': [0, 0, 0],
          Subtotal: [0, 0, 0]
        },
        {
          'State Staff': [0, 0, 0],
          'Other State Expenses': [0, 0, 0],
          'Private Contractor': [0, 0, 0],
          Subtotal: [0, 0, 0]
        },
        {
          'State Staff': [0, 0, 0],
          'Other State Expenses': [0, 0, 0],
          'Private Contractor': [0, 0, 0],
          Subtotal: [0, 0, 0]
        }
      ]
    }
  };
};

const calculateSummaryBudgetTableTotal = ({ years, activityBudget }) => {
  const expected = {};
      let totalStateShare = 0;
      let totalFedShare = 0;
      let totalTotal = 0;

      years.forEach((year, yearIndex) => {
        const ffyStateShare = activityBudget.map(
          activity =>
            activity.staff[yearIndex].stateShare +
            activity.expenses[yearIndex].stateShare +
            activity.privateContractors.FFYcosts[yearIndex].stateShare
        ).reduce((acc, curr) => acc + curr, 0);
        totalStateShare += ffyStateShare;

        const ffyFedShare = activityBudget.map(
          activity =>
            activity.staff[yearIndex].fedShare +
            activity.expenses[yearIndex].fedShare +
            activity.privateContractors.FFYcosts[yearIndex].fedShare
        ).reduce((acc, curr) => acc + curr, 0);
        totalFedShare += ffyFedShare;

        const ffyTotal = activityBudget.map(
          activity =>
            activity.staff[yearIndex].total +
            activity.expenses[yearIndex].total +
            activity.privateContractors.FFYcosts[yearIndex].total
        ).reduce((acc, curr) => acc + curr, 0);
        totalTotal += ffyTotal;

        expected.[`FFY ${year}`] = [ffyStateShare, ffyFedShare, ffyTotal];
      });
      expected.Total = [totalStateShare, totalFedShare, totalTotal];
      return expected;
}

const calculateQuarterlyFederalShareByFFY = ({ years, totals, quarterVals }) => {
  const hitAndHieByFFY = years.map((year, yearIndex) => {
    const inHouseCostsByActivity = totals.map((activity, activityIndex) => {
      cy.log(`activity: ${JSON.stringify(activity)}`)
      cy.log(`total = ${activity.staff[yearIndex]} + ${activity.expenses[yearIndex]} * ${activity.fedShare[yearIndex]}`);
      const total = (activity.staff[yearIndex] +
        activity.expenses[yearIndex]) * activity.fedShare[yearIndex];
      const costs = quarterVals[activityIndex].stateVals[yearIndex].map(val => total * val);
      costs.push(total);
      cy.log(`costs ${JSON.stringify(costs)}`);
      return costs;
    })
    const inHouseCosts = Array(inHouseCostsByActivity[0].length).fill(0).map((_, index) =>
      inHouseCostsByActivity.map(costs => costs[index]).reduce((acc, curr) => acc + curr)
    );

    const privateCostsByActivity = totals.map((activity, activityIndex) => {
      const total = activity.contractors[yearIndex] * activity.fedShare[yearIndex];
      const costs = quarterVals[activityIndex].contractorVals[yearIndex].map(val => total * val);
      costs.push(total);
      return costs;
    })
    const privateCosts = Array(privateCostsByActivity[0].length).fill(0).map((_, index) =>
      privateCostsByActivity.map(costs => costs[index]).reduce((acc, curr) => acc + curr)
    );

    const totalCosts = Array(privateCosts.length).fill(0).map((_, index) =>
      inHouseCosts[index] + privateCosts[index]
    );

    return {
      "In-House Costs": inHouseCosts,
      "Private Contractor Costs": privateCosts,
      "Total Enhanced FFP": totalCosts
    }
  });

  const totalCosts = {
    "In-House Costs": 0,
    "Private Contractor Costs": 0,
    "Total Enhanced FFP": 0
  };
  Object.keys(totals).forEach(key => {
    totals[key] = hitAndHieByFFY.map(ffy => ffy[key]).reduce((acc, curr) => acc + curr);
  });

  return {
    "HIT and HIE": {
      "byFFY": hitAndHieByFFY,
      "totals": totalCosts
    },
    "MMIS": {
      "byFFY": years.map(() =>
        ({
          "In-House Costs": [0, 0, 0, 0, 0],
          "Private Contractor Costs": [0, 0, 0, 0, 0],
          "Total Enhanced FFP": [0, 0, 0, 0, 0]
        })),
      "totals": {
        "In-House Costs": 0,
        "Private Contractor Costs": 0,
        "Total Enhanced FFP": 0
      }
    }
  };
}


export const testProposedBudgetWithData = years => {
  let proposedBudgetPage;
  let activityList;
  let activityData;
  let activityBudget;

  before(() => {
    proposedBudgetPage = new ProposedBudgetPage();
    const activityPage = new ActivitySchedulePage();
    cy.goToActivityScheduleSummary();
    cy.wait(1000); // eslint-disable-line cypress/no-unnecessary-waiting
    activityList = activityPage.getActivityScheduleOverviewNameList();

    cy.fixture('activity-overview-template.json').then(data => {
      activityData = data;
      activityBudget = [];
      // the first was deleted in the tests
      activityBudget.push(
        calculateCostsByActivityOrProgramType({
          years,
          staff: activityData.staff.slice(1, 2),
          expenses: activityData.expenses.slice(1, 2),
          privateContractors: activityData.privateContractors.slice(1, 2),
          totals: activityData.totals[0]
        })
      ); // activity 1 - HIT

      activityBudget.push(
        calculateCostsByActivityOrProgramType({
          years,
          staff: activityData.staff.slice(2),
          expenses: activityData.expenses.slice(2),
          privateContractors: activityData.privateContractors.slice(2),
          totals: activityData.totals[1]
        })
      ); // activity 2 - HIE
    });
  });

  beforeEach(() => {
    cy.goToProposedBudget();
  });

  it('should go to the correct page', () => {
    cy.url().should('include', '/proposed-budget');
    cy.findByRole('heading', { level: 2, name: 'Proposed Budget' });
    cy.log(`years: ${JSON.stringify(years)}`);
  });

  describe('Summary Budget by Activity', () => {
    it('should have the correct values for Total Computable Medicaid Cost', () => {
      const expected = calculateComputableMedicaidCostByFFY({ years, activityBudget });
      proposedBudgetPage.verifyComputableMedicaidCostByFFY({ years, expected });
    });

    it('should have the correct values for Activity Breakdown', () => {
      const expected = calculateActvityBreakdownByFFYAndActivity({ years, activityBudget });

      proposedBudgetPage.verifyActvityBreakdownByFFYAndActivity({
        years,
        activityList,
        expected
      });
    });
  });

  describe('Summary Budget Table by Expense Type', () => {
    it('should have the correct values for Expense Type tables', () => {
      const expected = calculateSummaryBudgetTableByTypeAndFFY({ years, activityBudget });

      proposedBudgetPage.verifySummaryBudgetTableByTypeAndFFY({
        years,
        expected
      });
    });

    it('should have the correct values for Activities Totals table', () => {
      const expected = calculateSummaryBudgetTableTotal({ years, activityBudget });

      proposedBudgetPage.verifySummaryBudgetTableTotal({
        expected
      });
    });
  });

  describe('Quarterly Federal Share by FFP', () => {
    it('should have the correct values for FFY tables', () => {
      const expected = calculateQuarterlyFederalShareByFFY({
        years,
        totals: activityData.totals,
        quarterVals: activityData.quarterVals
      });
      cy.log(`expected ${JSON.stringify(expected)}`);

      proposedBudgetPage.verifyQuarterlyFederalShareByFFY({
        years,
        expected
      });
    });

    xit('should have the correct values for Total tables', () => {
      const expected = calculateQuarterlyFederalShareByFFY({
        years,
        totals: activityData.totals,
        quarterVals: activityData.quarterVals
      });

      proposedBudgetPage.verifyQuarterlyFederalShareByFFYTotals({
        expected
      });
    });
  });
};

export const testProposedBudgetExportViewWithData = () => {};
