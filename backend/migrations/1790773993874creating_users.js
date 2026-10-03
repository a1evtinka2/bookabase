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
  pgm.createTable('users', {
    id: { type: 'uuid', primaryKey: true },
    nickname: { type: 'varchar(50)', notNull: true, unique: true },
    dateOfBirth: { type: 'date', notNull: true},
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.addConstraint('users', 'check_nickname', {
    check: "nickname ~ '^(([a-zA-Z0-9_-]+)|([α-ωΑ-Ω0-9_-]+)|([\u0621-\u064A\u0660-\u0669_-]+)|([ёЁа-яА-Я0-9_-]+))$'"
});
};


/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('users');
};
