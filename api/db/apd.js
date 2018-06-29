module.exports = () => ({
  apd: {
    tableName: 'apds',

    activities() {
      return this.hasMany('apdActivity');
    },

    keyPersonnel() {
      return this.hasMany('apdKeyPersonnel');
    },

    previousActivityExpenses() {
      return this.hasMany('apdPreviousActivityExpense');
    },

    state() {
      return this.belongsTo('state');
    },

    versions() {
      return this.hasMany('apdVersion');
    },

    format(attributes) {
      const out = { ...attributes };
      [
        ['federalCitations', 'federal_citations'],
        ['previousActivitySummary', 'previous_activity_summary'],
        ['programOverview', 'program_overview'],
        ['narrativeHIE', 'narrative_hie'],
        ['narrativeHIT', 'narrative_hit'],
        ['narrativeMMIS', 'narrative_mmis']
      ].forEach(([camel, snake]) => {
        delete out[camel];
        if (attributes[camel] !== undefined) {
          out[snake] = attributes[camel];
        }
      });

      if (attributes.federalCitations) {
        out.federal_citations = JSON.stringify(out.federal_citations);
      }
      if (attributes.years) {
        out.years = JSON.stringify(attributes.years);
      }

      if (attributes.stateProfile) {
        if (attributes.stateProfile.medicaidDirector) {
          out.medicaid_director_name =
            attributes.stateProfile.medicaidDirector.name || null;
          out.medicaid_director_email =
            attributes.stateProfile.medicaidDirector.email || null;
          out.medicaid_director_phone =
            attributes.stateProfile.medicaidDirector.phone || null;
        }
        if (attributes.stateProfile.medicaidOffice) {
          out.medicaid_office_address1 =
            attributes.stateProfile.medicaidOffice.address1 || null;
          out.medicaid_office_address2 =
            attributes.stateProfile.medicaidOffice.address2 || null;
          out.medicaid_office_city =
            attributes.stateProfile.medicaidOffice.city || null;
          out.medicaid_office_state =
            attributes.stateProfile.medicaidOffice.state || null;
          out.medicaid_office_zip =
            attributes.stateProfile.medicaidOffice.zip || null;
        }
        delete out.stateProfile;
      }

      return out;
    },

    toJSON() {
      return {
        id: this.get('id'),
        activities: this.related('activities').toJSON(),
        federalCitations: this.get('federal_citations'),
        keyPersonnel: this.related('keyPersonnel').toJSON(),
        narrativeHIE: this.get('narrative_hie'),
        narrativeHIT: this.get('narrative_hit'),
        narrativeMMIS: this.get('narrative_mmis'),
        period: this.get('period'),
        previousActivityExpenses: this.related(
          'previousActivityExpenses'
        ).toJSON(),
        previousActivitySummary: this.get('previous_activity_summary'),
        programOverview: this.get('program_overview'),
        state: this.get('state_id'),
        stateProfile: {
          medicaidDirector: {
            name: this.get('medicaid_director_name'),
            email: this.get('medicaid_director_email'),
            phone: this.get('medicaid_director_phone')
          },
          medicaidOffice: {
            address1: this.get('medicaid_office_address1'),
            address2: this.get('medicaid_office_address2'),
            city: this.get('medicaid_office_city'),
            state: this.get('medicaid_office_state'),
            zip: this.get('medicaid_office_zip')
          }
        },
        status: this.get('status'),
        years: this.get('years')
      };
    },

    static: {
      updateableFields: [
        'federalCitations',
        'previousActivitySummary',
        'programOverview',
        'narrativeHIE',
        'narrativeHIT',
        'narrativeMMIS',
        'stateProfile',
        'years'
      ],
      foreignKey: 'apd_id',
      owns: {
        activities: 'apdActivity',
        keyPersonnel: 'apdKeyPersonnel',
        previousActivityExpenses: 'apdPreviousActivityExpense'
      },
      withRelated: [
        { activities: query => query.orderBy('id') },
        'activities.contractorResources',
        'activities.contractorResources.years',
        'activities.costAllocation',
        'activities.goals',
        'activities.expenses',
        'activities.expenses.entries',
        'activities.schedule',
        'activities.statePersonnel',
        'activities.statePersonnel.years',
        'keyPersonnel',
        'keyPersonnel.years',
        'previousActivityExpenses'
      ]
    }
  }
});
