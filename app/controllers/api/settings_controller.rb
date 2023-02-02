class Api::SettingsController < ApplicationController

    def update
        @setting = Setting.find_by(setting: settings_params[:setting])
        if @setting.update(settings_params)
            render :show
        else
            render json: ['Could not update setting'], status: 422
        end
    end

    def index
        @settings = Setting.all
        if @settings
            render :index
        else
            render json: ['No settings have been found']
        end
    end

    private
    def settings_params
        params.require(:setting).permit(:setting,:value)
    end
end
