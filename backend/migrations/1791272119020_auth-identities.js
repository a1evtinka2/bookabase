/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable('auth_identities', {
    id: { type: 'uuid', primaryKey: true },
    userId: { type: 'uuid', notNull: true, references: 'users' },
    issuer: { type: 'varchar', notNull: true },
    subject: { type: 'varchar', notNull: true  },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.addConstraint('auth_identities', 'auth_creds_per_one_user_constraint', { unique: ["issuer", "subject"] });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};
