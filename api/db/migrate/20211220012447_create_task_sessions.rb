class CreateTaskSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :task_sessions do |t|
      t.references :task, foreign_key: true
      t.references :user, foreign_key: true
      t.datetime :start_time, null: false
      t.datetime :end_time, null: false
      t.bigint :duration, null: false

      t.timestamps
    end
  end
end
