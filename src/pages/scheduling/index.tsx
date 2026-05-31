import React, { useMemo, useState } from "react";
import { FiCalendar, FiPlus } from "react-icons/fi";
import { PageLayout } from "../../components/layouts/page-layout";
import { Button } from "../../components/ui/button";
import { useDepartments, useUnits } from "../../hooks/use-departments";
import {
  useCreateSchedule,
  useSchedules,
  useUpdateSchedule,
} from "../../hooks/use-scheduling";
import type {
  DayOfWeek,
  Schedule as ApiSchedule,
} from "../../services/scheduling";

type ScheduleStatus = "active" | "paused";

interface Schedule {
  id: string;
  title: string;
  department: string;
  unit: string;
  staff: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
  notes: string;
}

interface ScheduleFormData {
  unitId: string;
  dayOfWeek: DayOfWeek;
  openingTime: string;
  closingTime: string;
  maxCapacity: string;
}

const emptyForm: ScheduleFormData = {
  unitId: "",
  dayOfWeek: "MONDAY",
  openingTime: "",
  closingTime: "",
  maxCapacity: "",
};

const dayOptions: DayOfWeek[] = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY",
];

const formatTime = (time: ApiSchedule["openingTime"]) => {
  if (typeof time === "string") return time;

  return `${String(time.hour).padStart(2, "0")}:${String(time.minute).padStart(
    2,
    "0",
  )}`;
};

const toApiTimeString = (time: string) => {
  const [hour = "0", minute = "0"] = time.split(":");

  return `${Number(hour)}:${minute.padStart(2, "0")}`;
};

const Scheduling: React.FC = () => {
  const [formData, setFormData] = useState<ScheduleFormData>(emptyForm);
  const departmentsQuery = useDepartments();
  const unitsQuery = useUnits();
  const schedulesQuery = useSchedules();
  const createSchedule = useCreateSchedule();
  const updateSchedule = useUpdateSchedule();

  const apiSchedules = Array.isArray(schedulesQuery.data)
    ? schedulesQuery.data
    : schedulesQuery.data?.schedules || [];

  const schedules: Schedule[] = apiSchedules.map((schedule: ApiSchedule) => {
    const unit = unitsQuery.data?.find((item) => item.id === schedule.unitId);
    const department = departmentsQuery.data?.find(
      (item) => item.id === unit?.departmentId,
    );

    return {
      id: schedule.id,
      title: `${unit?.name || "Unit"} ${schedule.dayOfWeek}`,
      department: department?.name || "Unassigned",
      unit: unit?.name || schedule.unitId,
      staff: "",
      date: schedule.dayOfWeek,
      startTime: formatTime(schedule.openingTime),
      endTime: formatTime(schedule.closingTime),
      status: schedule.isActive === false ? "paused" : "active",
      notes: schedule.maxCapacity
        ? `Max capacity: ${schedule.maxCapacity}`
        : "",
    };
  });

  const activeSchedules = schedules.filter(
    (schedule) => schedule.status === "active",
  );
  const uniqueDepartments = useMemo(
    () => new Set(schedules.map((schedule) => schedule.department)).size,
    [schedules],
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid =
      formData.unitId &&
      formData.dayOfWeek &&
      formData.openingTime &&
      formData.closingTime;

    if (!isValid) return;

    createSchedule.mutate(
      {
        unitId: formData.unitId,
        dayOfWeek: formData.dayOfWeek,
        openingTime: toApiTimeString(formData.openingTime),
        closingTime: toApiTimeString(formData.closingTime),
        maxCapacity: formData.maxCapacity
          ? Number(formData.maxCapacity)
          : undefined,
      },
      {
        onSuccess: () => setFormData(emptyForm),
      },
    );
  };

  const handleToggleStatus = (id: string) => {
    const schedule = schedules.find((item) => item.id === id);

    if (!schedule) return;

    updateSchedule.mutate({
      id,
      payload: {
        isActive: schedule.status !== "active",
      },
    });
  };

  const metrics = [
    { label: "Active Schedules", value: activeSchedules.length },
    { label: "Departments Covered", value: uniqueDepartments },
    { label: "Upcoming Blocks", value: schedules.length },
  ];

  return (
    <PageLayout
      title="Scheduling"
      subtitle="Create and manage staff coverage schedules across departments and units."
      actions={
        <Button
          title="New Schedule"
          variant="primary"
          size="md"
          iconLeft={<FiPlus />}
          onClick={() => {
            document.getElementById("schedule-unit")?.focus();
          }}
        />
      }
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="bg-white rounded-lg border border-slate-200 p-5"
            >
              <p className="text-sm font-semibold text-gray-600">
                {metric.label}
              </p>
              <p className="text-3xl font-bold text-gray-900 mt-2">
                {metric.value}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          <div className="xl:col-span-1">
            <div className="bg-white rounded-xl border border-slate-200 p-6 xl:sticky xl:top-20">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Create Schedule
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Select a unit, day, operating window, and capacity.
              </p>

              <form onSubmit={handleCreateSchedule} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Unit ID
                  </label>
                  <select
                    id="schedule-unit"
                    name="unitId"
                    value={formData.unitId}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Unit</option>
                    {(unitsQuery.data || []).map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Day of Week
                  </label>
                  <select
                    name="dayOfWeek"
                    value={formData.dayOfWeek}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    {dayOptions.map((day) => (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      name="openingTime"
                      value={formData.openingTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      name="closingTime"
                      value={formData.closingTime}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    name="maxCapacity"
                    value={formData.maxCapacity}
                    onChange={handleChange}
                    min={1}
                    placeholder="879"
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <Button
                  title="Create Schedule"
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full"
                  iconLeft={<FiCalendar />}
                  disabled={
                    !formData.unitId ||
                    !formData.dayOfWeek ||
                    !formData.openingTime ||
                    !formData.closingTime
                  }
                />
              </form>
            </div>
          </div>

          <div className="xl:col-span-3">
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Managed Schedules
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Review coverage blocks and pause or reactivate schedules.
                </p>
              </div>

              <div className="divide-y divide-slate-200">
                {schedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="p-6 flex flex-col lg:flex-row lg:items-center gap-5 lg:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <h4 className="text-base font-semibold text-gray-900">
                          {schedule.title}
                        </h4>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            schedule.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {schedule.status === "active" ? "Active" : "Paused"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {schedule.department} / {schedule.unit}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {schedule.date} · {schedule.startTime} -{" "}
                        {schedule.endTime}
                      </p>
                      {schedule.notes && (
                        <p className="text-sm text-gray-500 mt-2">
                          {schedule.notes}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <button
                        onClick={() => handleToggleStatus(schedule.id)}
                        className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
                          schedule.status === "active"
                            ? "bg-blue-600"
                            : "bg-gray-300"
                        }`}
                        aria-label={`Toggle ${schedule.title} status`}
                      >
                        <span
                          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                            schedule.status === "active"
                              ? "translate-x-6"
                              : "translate-x-1"
                          } my-auto`}
                        />
                      </button>
                      <span className="text-sm text-gray-600">
                        Schedule active
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Scheduling;
