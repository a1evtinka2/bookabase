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
  pgm.createType('item_type', ['book', 'film']);
  pgm.createTable('items', {
    id: { type: 'uuid', primaryKey: true },
    authorId: { type: 'uuid', notNull: true },
    type: { type: 'item_type', notNull: true },
    title: { type: 'varchar(200)', notNull: true },
    normalizedTitle: { type: 'varchar(200)', notNull: true, },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.addConstraint('items', 'fk_author_id', 'FOREIGN KEY ("authorId") REFERENCES authors(id)');
  pgm.addConstraint('items', 'unique_items_constraint', 'UNIQUE (type, "normalizedTitle", "authorId")');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable('items');
};
