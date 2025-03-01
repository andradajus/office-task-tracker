class Api::V1::TasksController < ApplicationController
  before_action :set_task, only: [:update, :complete_tasks]

  def create
    @task = Task.new(task_params)
    if @task.save
      if @task.is_routinary
        create_routinary_task_instance(@task)
      end
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def complete_tasks
    if @task.is_completed
      @task.update(is_completed: false, completed_by: nil, date_completed: nil)
    else
      @task.update(is_completed: true, completed_by: "#{current_user.last_name}, #{current_user.first_name}", date_completed: Date.current)
    end

    if @task.save
      render json: @task, status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def index
    date = params[:date] ? Date.parse(params[:date]) : Date.current
    tasks = Task.where(date: date).or(Task.where(is_routinary: true))
    render json: tasks, status: :ok
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def create_routinary_task_instance(task)
    RoutinaryTaskInstance.create(
      task: task,
      date: task.date,
      task_name: task.task_name,
      assigned_to: task.assigned_to,
      assigned_by: task.assigned_by,
      remarks: task.remarks
    )
  end

  def task_params
    params.require(:task).permit(:date, :task_name, :assigned_to, :assigned_by, :date_completed, :completed_by, :remarks, :is_routinary, :is_completed)
  end
end
