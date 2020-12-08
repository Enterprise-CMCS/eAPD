# ER Diagram

Copy-paste content below into [nomnoml.com]()

```no-highlight
[states |
  id varchar(2)
  name
  medicaid_office
]

[auth_roles |
  name (state-admin, state-coordinator, federal-admin, ...)
  isActive
]

[auth_role_activity_mapping |
  role_id
  activity_id
]

[auth_activities |
  name (view-*, edit-*, delete-*, ...)
]

[auth_roles]->[auth_role_activity_mapping]
[auth_activities]->[auth_role_activity_mapping]

[notifications |
  user_id
  message
  created_at
  updated_at (viewed_at/dismissed_at)
]

[affiliations |
  user_id
  state_id
  role_id
  status (requested, approved, denied, revoked)
  created_at (requested_at)
  updated_at
  updated_by
]

[users]->[affiliations]
[states]->[affiliations]
[affiliations]->[auth_roles]
```
