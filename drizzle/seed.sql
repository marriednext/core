INSERT INTO wedding (id, subdomain)
VALUES
  ('6b17d847-2262-4a78-87c3-2aa4090e483d','demo');

INSERT INTO guest (name_on_invitation, is_attending, has_plus_one)
VALUES
  ('Ken', false, false),
  ('Terri', false, false),
  ('Jordan', false, false),
  ('Harlie', false, false),
  ('Letty', false, false),
  ('Brandy', false, false),
  ('Thomas', false, false),
  ('Liam', false, false),
  ('Alex', false, false),
  ('Ezequiel', false, false),
  ('Shayna', false, false),
  ('Javier', false, false),
  ('Johnny', false, false),
  ('Alyssa', false, false),
  ('Daniel', false, false),
  ('Daisy', false, false),
  ('Hunter', false, false),
  ('Zach', false, false),
  ('Tyler', false, true),
  ('Jessica', false, true),
  ('Barbara', false, true),
  ('Jim', false, true),
  ('Evelynn', false, true),
  ('Elia', false, false),
  ('Ofe', false, false),
  ('John', false, true),
  ('Kathleen', false, true),
  ('Dulce', false, true),
  ('Lisa', false, false),
  ('Teri', false, false),
  ('Sydney', false, false),
  ('Taylor', false, false),
  ('Josh', false, false),
  ('Nicole', false, false),
  ('Hannah', false, false),
  ('Isaac', false, false),
  ('David', false, false),
  ('Vickie', false, false),
  ('Ryan', false, false),
  ('Lauren', false, false),
  ('Cody', false, false),
  ('Tim', false, false),
  ('Denise', false, false),
  ('Mike', false, false),
  ('Judy', false, false),
  ('Chuck', false, false),
  ('Ricky', false, false),
  ('Granny', false, false),
  ('Poppy', false, false),
  ('Kami', false, false),
  ('Gracie', false, false),
  ('Tanner', false, false),
  ('Cindy', false, false),
  ('Aubrey', false, false),
  ('Chris', false, false);


UPDATE guest
   SET wedding_id = '6b17d847-2262-4a78-87c3-2aa4090e483d'
   WHERE wedding_id IS NULL;

-- Couple invitations
INSERT INTO invitation (guest_a, guest_b, invite_group_name)
VALUES
  ('Ken', 'Terri', 'Ken & Terri'),
  ('Jordan', 'Harlie', 'Jordan & Harlie'),
  ('Johnny', 'Alyssa', 'Johnny & Alyssa'),
  ('Daniel', 'Daisy', 'Daniel & Daisy'),
  ('Ezequiel', 'Shayna', 'Ezequiel & Shayna'),
  ('Elia', 'Ofe', 'Elia & Ofe'),
  ('Josh', 'Nicole', 'Josh & Nicole'),
  ('Hannah', 'Isaac', 'Hannah & Isaac'),
  ('David', 'Vickie', 'David & Vickie'),
  ('Lauren', 'Cody', 'Lauren & Cody'),
  ('Tim', 'Denise', 'Tim & Denise'),
  ('Mike', 'Judy', 'Mike & Judy'),
  ('Chuck', 'Ricky', 'Chuck & Ricky'),
  ('Granny', 'Poppy', 'Granny & Poppy'),
  ('Ryan', 'Gracie', 'Ryan & Gracie');

-- Single invitations
INSERT INTO invitation (guest_a, invite_group_name)
VALUES
  ('Letty', 'Letty'),
  ('Brandy', 'Brandy'),
  ('Thomas', 'Thomas'),
  ('Liam', 'Liam'),
  ('Alex', 'Alex'),
  ('Javier', 'Javier'),
  ('Hunter', 'Hunter'),
  ('Zach', 'Zach'),
  ('Tyler', 'Tyler'),
  ('Jessica', 'Jessica'),
  ('Barbara', 'Barbara'),
  ('Jim', 'Jim'),
  ('Evelynn', 'Evelynn'),
  ('John', 'John'),
  ('Kathleen', 'Kathleen'),
  ('Dulce', 'Dulce'),
  ('Lisa', 'Lisa'),
  ('Teri', 'Teri'),
  ('Sydney', 'Sydney'),
  ('Taylor', 'Taylor'),
  ('Kami', 'Kami');

UPDATE invitation
   SET wedding_id = '6b17d847-2262-4a78-87c3-2aa4090e483d'
   WHERE wedding_id IS NULL;

