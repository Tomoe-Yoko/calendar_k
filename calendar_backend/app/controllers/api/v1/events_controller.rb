class Api::V1::EventsController < ApplicationController
before_action :set_event, only:[:show,:update,:destroy]

def index
  @events=Event.all
  render json:@events
end

def show
  # event=Event.find(params[:id])
  render json:@event
end

def create
  event=Event.new(event_params)
  if event.save
    render json:event,status: :created # 201
  else
    render json:event.errors,status: :unprocessable_entity
  end
end

def update
  # @event=Event.find(params[:id])
  if @event.update(event_params)
    render json:@event
  else 
    render json:@event.errors,status: :unprocessable_entity
  end
end

def destroy
  # event=Event.find(params[:id])
  @event.destroy
  head :no_content
end

 private

def set_event
@event =Event.find(params[:id])
end

def event_params
params.require(:event).permit(:name,:title,:start_date,:end_date,:start_time,:end_time,:memo,:color)
end


end
