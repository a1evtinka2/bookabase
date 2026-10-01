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
  pgm.createTable('ratings', {
    id: { type: 'uuid', primaryKey: true },
    userId: { type: 'uuid', notNull: true, references: 'users' },
    itemId: { type: 'uuid', notNull: true, references: 'items' },
    value: { type: 'integer', notNull: true, check: 'value BETWEEN 1 AND 10' },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.addConstraint('ratings', 'one_score_per_user_constraint', { unique: ["userId", "itemId"] });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('ratings');
};
