DO $$
DECLARE
user_id varchar(255) := '<<okta id>>';
username varchar(255) := '<<okta username>>';

role_id public.auth_roles.id%type;
state_id public.states.id%type;

BEGIN

SELECT id FROM public.auth_roles INTO role_id WHERE name = 'eAPD System Admin';

FOR state_id IN SELECT id FROM public.states
LOOP
INSERT INTO public.auth_affiliations(
	user_id, username, state_id, role_id, status, updated_by)
	VALUES (user_id, username, state_id, role_id, 'approved', 'admin-script');

END LOOP;
END;
$$ 