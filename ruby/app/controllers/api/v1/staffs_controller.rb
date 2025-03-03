class Api::V1::StaffsController < ApplicationController
  before_action :set_staff, only: [:update, :destroy]

  def index
    @staff = Staff.all
    render json: @staff
  end

  def create
    @staff = Staff.new(staff_params)
    if @staff.save
      render json: @staff, status: :created
    else
      render json: @staff.errors, status: :unprocessable_entity
    end
  end

  def update
    if @staff.update(staff_params)
      render json: @staff
    else
      render json: @staff.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @staff.destroy
    head :no_content
  end

  private

  def set_staff
    @staff = Staff.find(params[:id])
  end

  def staff_params
    params.require(:staff).permit(:first_name, :middle_name, :last_name, :designation)
  end
end
