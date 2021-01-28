# ER Diagram

Copy-paste content below into [nomnoml.com]()

```nomnoml

[apd_events |
  event_id
  user_id
  apd_id
  event_type
  event_at
  metadata
]

[apd_files |
  id
  apd_id
  size
  metadata
]

[apd_version |
  id
  apd_id
  content
  created
  user_id
]

[apd |
  id
  created_at
  updated_at
  status
  years
  state_id
  document
]

[auth_roles |
  id
  name (state-admin, state-coordinator, federal-admin, ...)
  isActive
]

[auth_role_activity_mapping |
  role_id
  activity_id
]

[auth_activities |
  id
  name (view-*, edit-*, delete-*, ...)
]

[states |
  id
  name
  medicaid_office
]

[affiliations |
  id
  user_id
  state_id
  role_id
  status (requested, approved, denied, revoked)
  created_at (requested_at)
  updated_at
  updated_by
]

[knex_migrations |
  id
  name
  batch
  migration_time
]

[knex_migration_lock |
  index
  is_locked
]

[apd_version] -> [apd]
[apd_version] -> [users (from Okta)]
[apd_files] -> [apd]
[apd_events] -> [apd]
[apd_events] -> [users (from Okta)]
[apd] -> [states]

[affiliations]->[states]
[affiliations]->[users (from Okta)]
[affiliations]->[auth_roles]

[auth_role_activity_mapping]->[auth_roles]
[auth_role_activity_mapping]->[auth_activities]
```
