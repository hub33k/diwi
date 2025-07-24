-- user.surql
-- ===========================================================================
DEFINE TABLE OVERWRITE user SCHEMAFULL;

-- Core user fields
DEFINE FIELD OVERWRITE email ON TABLE user TYPE string ASSERT string::is::email($value);
DEFINE INDEX OVERWRITE user_email_index ON TABLE user COLUMNS email UNIQUE;

DEFINE FIELD OVERWRITE username ON TABLE user TYPE string ASSERT string::len($value) >= 3 AND string::len($value) <= 30;
DEFINE INDEX OVERWRITE user_username_index ON TABLE user COLUMNS username UNIQUE;

DEFINE FIELD OVERWRITE name ON TABLE user TYPE option<string>;
DEFINE FIELD OVERWRITE avatar_url ON TABLE user TYPE option<string>;

-- Status and verification
DEFINE FIELD OVERWRITE status ON TABLE user TYPE string DEFAULT 'active' ASSERT $value IN ['active', 'inactive', 'suspended', 'deleted'];
DEFINE FIELD OVERWRITE is_email_verified ON TABLE user TYPE bool DEFAULT false;
DEFINE FIELD OVERWRITE email_verified_at ON TABLE user TYPE option<datetime>;

-- Timestamps
DEFINE FIELD OVERWRITE created_at ON TABLE user READONLY TYPE datetime VALUE time::now();
DEFINE FIELD OVERWRITE updated_at ON TABLE user TYPE datetime DEFAULT time::now() VALUE time::now();
DEFINE FIELD OVERWRITE last_login_at ON TABLE user TYPE option<datetime>;

-- Soft delete support
DEFINE FIELD OVERWRITE deleted_at ON TABLE user TYPE option<datetime>;

-- Index for status queries
DEFINE INDEX OVERWRITE user_status_index ON TABLE user COLUMNS status;
