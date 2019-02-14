#!/usr/bin/env node

const path = require('path');

const deleteActivityBits = where => {
  console.log('-- Deleting the yearly/hourly chunks of activities');
  console.log(
    `DELETE FROM activity_contractor_files WHERE activity_contractor_resource_id IN (SELECT id FROM activity_contractor_resources WHERE ${where});`
  );
  console.log(
    `DELETE FROM activity_contractor_resources_hourly WHERE contractor_resource_id IN (SELECT id FROM activity_contractor_resources WHERE ${where});`
  );
  console.log(
    `DELETE FROM activity_contractor_resources_yearly WHERE contractor_resource_id IN (SELECT id FROM activity_contractor_resources WHERE ${where});`
  );
  console.log(
    `DELETE FROM activity_expense_entries WHERE expense_id IN (SELECT id FROM activity_expenses WHERE ${where});`
  );
  console.log(
    `DELETE FROM activity_state_personnel_yearly WHERE personnel_id IN (SELECT id FROM activity_state_personnel WHERE ${where});`
  );

  console.log('\n-- Deleting activity pieces');

  [
    'activity_contractor_resources',
    'activity_cost_allocation',
    'activity_expenses',
    'activity_files',
    'activity_goals',
    'activity_quarterly_ffp',
    'activity_schedule',
    'activity_state_personnel'
  ].forEach(table => {
    console.log(`DELETE FROM ${table} WHERE ${where};`);
  });
};

const deleteApdBits = where => {
  deleteActivityBits(
    `activity_id IN (SELECT id FROM activities WHERE ${where})`
  );

  console.log('\n-- Deleting APD yearly/hourly chunks of activities');
  console.log(
    `DELETE FROM apd_key_personnel_yearly WHERE apd_key_personnel_id IN (SELECT id FROM apd_key_personnel WHERE ${where});`
  );

  console.log('\n-- Deleting APD pieces');
  [
    'activities',
    'apd_incentive_payments',
    'apd_key_personnel',
    'apd_previous_activity_expenses',
    'apd_versions'
  ].forEach(table => {
    console.log(`DELETE FROM ${table} WHERE ${where};`);
  });
};

const deleteApd = id => {
  deleteApdBits(`apd_id=${id}`);

  console.log('\n-- Deleting APDs.  Bye!');
  console.log(`DELETE FROM apds WHERE id=${id};`);
};

const deleteApdsForState = id => {
  deleteApdBits(`apd_id IN (SELECT id FROM apds WHERE state_id='${id}')`);

  console.log('\n-- Deleting APDs.  Bye!');
  console.log(`DELETE FROM apds WHERE state_id='${id}';`);
};

const [, , id] = process.argv;

if (/^\d+$/.test(id)) {
  deleteApd(id);
} else if (/^[a-z]{2}$/i.test(id)) {
  deleteApdsForState(id.toLowerCase());
} else {
  console.log(`
  Generates SQL statements for deleting one or several
  APDs, cascading through all the related tables.

  Usage:

  node ${path.relative(process.cwd(), process.argv[1])} <id>

  <id> - Required. To delete a single APD, use the APD
         numeric ID.  To delete all APDs for a given
         state, use the state's two-letter ID.
  `);
}
